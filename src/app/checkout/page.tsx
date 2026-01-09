"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client/react";
import Input from "@/components/input/Input";
import SberPayIcon from "@/components/icons/SberPayIcon";
import TBankPayIcon from "@/components/icons/TBankPayIcon";
import CreditCardIcon from "@/components/icons/CreditCardIcon";
import CartItem from "@/components/cart-item/CartItem";
import AuthenticationBlock from "./authentication-block/AuthenticationBlock";
import DeliveryAddress from "./delivery-address/DeliveryAddress";
import CartEmpty from "./CartEmpty";
import { CHECKOUT_ORDER } from "./operation";
import { GET_CART_QUERY } from "@/components/cart/operations";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import { calculateDeliveryPrice, getCoordinate } from "@/lib/y-map-common";
import { canCheckout } from "./canCheckout";
import spbIcon from "./sbp-icon.png";
import { OrderDirection } from "@/types/__generated__/graphql";
import "./checkout.scss";

type PaymentMethodId = "bank_card" | "sbp" | "tinkoff_bank" | "sberbank";

const paymentMethods = [
  {
    id: "bank_card",
    logo: CreditCardIcon,
    title: "Оплата через сервис ЮKassa",
  },
  {
    id: "tinkoff_bank",
    logo: TBankPayIcon,
    title: "T-PAY",
  },
  {
    id: "sberbank",
    logo: SberPayIcon,
    title: "SBER PAY",
  },
];

interface CheckoutState {
  customerComment: string;
  paymentMethod: PaymentMethodId;
  modalAddress: {
    show: boolean;
    action: "create" | "update";
  };
  deliveryCost: number;
  orderTotalAmount: number;
}

function Checkout() {
  const router = useRouter();

  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    customerComment: "",
    paymentMethod: "bank_card",
    modalAddress: {
      show: false,
      action: "create",
    },
    deliveryCost: 0,
    orderTotalAmount: 0,
  });

  // query CART data
  const { data } = useQuery(GET_CART_QUERY, {
    variables: {
      cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
      orderImagesBy: [{ createdAt: OrderDirection.Asc }],
    },
  });
  const cart = data?.queryCart;

  const { data: authResult } = useQuery(AUTHORIZED_USER_QUERY);
  const authUser = authResult?.queryAuthorizedUser;

  // POPULATE INITIAL SUB TOTAL
  useMemo(() => {
    if (cart) {
      setCheckoutState((prvState) => ({
        ...prvState,
        orderTotalAmount: cart.subTotal!,
      }));
    }
  }, [cart]);

  // Check for address delivary and calculate the price
  const handleSetDeliveryCost = useCallback(
    async (address: string | undefined, subTotal: number) => {
      let orderTotalAmount = subTotal;
      let deliveryCost = 0;
      if (address) {
        const coord = await getCoordinate(address);
        const lng = coord?.geometry?.coordinates[0];
        const lat = coord?.geometry?.coordinates[1];
        if (lng && lat) {
          const ROUTE_END: [number, number] = [lng, lat];
          const { price } = calculateDeliveryPrice(ROUTE_END);
          orderTotalAmount = price + subTotal;
          deliveryCost = price;
        }
      }
      setCheckoutState((prvState) => ({
        ...prvState,
        deliveryCost,
        orderTotalAmount,
      }));
    },
    []
  );

  useEffect(() => {
    if (authUser && cart) {
      const { delivaryAddress } = authUser;
      const userAddress = delivaryAddress?.address;
      handleSetDeliveryCost(userAddress!, cart.subTotal!);
    }
  }, [authUser, cart, handleSetDeliveryCost]);

  const setModalAddresss = (action: "create" | "update") => {
    setCheckoutState((prvState) => ({
      ...prvState,
      modalAddress: {
        show: !prvState.modalAddress.show,
        action,
      },
    }));
  };

  const closeModal = () => {
    setCheckoutState((prvState) => ({
      ...prvState,
      modalAddress: {
        show: !prvState.modalAddress.show,
        action: "create",
      },
    }));
  };

  const onInputChange = ({ value }: { name: string; value: string }) => {
    setCheckoutState((prvState) => ({ ...prvState, customerComment: value }));
  };

  const setPaymentMethod = (paymentMethod: string) => {
    setCheckoutState((prvState) => ({
      ...prvState,
      paymentMethod: paymentMethod as PaymentMethodId,
    }));
  };

  // Checkout Action
  const [checkoutOrder, { loading }] = useMutation(CHECKOUT_ORDER, {
    variables: {
      deliveryAddressId: authUser?.delivaryAddress?.id,
      shippingCost: checkoutState.deliveryCost,
      paymentMethod: checkoutState.paymentMethod,
      customerNote: checkoutState.customerComment,
    },

    onCompleted(data) {
      const paymentUrl = data.checkOut.redirectUrl!;
      router.push(paymentUrl);
    },
    onError(error) {
      console.error("Error occur when try to checout order -> ", error);
    },
    refetchQueries: [GET_CART_QUERY, AUTHORIZED_USER_QUERY],
  });

  const isCheckout = canCheckout(
    authUser?.id,
    authUser?.delivaryAddress?.id,
    checkoutState.deliveryCost,
    checkoutState.paymentMethod
  );

  if (!cart) return <CartEmpty />;

  return (
    <div className="checkout">
      <div className="checkout__user-info">
        {authUser ? (
          <>
            <section className="user-info__section profile">
              <h3 className="user-info__section-title">1. Мои данные</h3>
              <div className="user-info__profile">
                <div className="user-info__profile-name">
                  <h5 className="user-info__profile-name-title">Имя</h5>
                  <span className="user-info__profile-name-text">
                    {authUser.name}
                  </span>
                </div>
                <div className="user-info__profile-number">
                  <h5 className="user-info__profile-number-title">Телефон</h5>
                  <span className="user-info__profile-number-text">
                    {authUser.phoneNumber}
                  </span>
                </div>
              </div>
            </section>

            <section className="user-info__section address">
              <h3 className="user-info__section-title">2. Адрес</h3>
              {authUser.delivaryAddress && authUser.delivaryAddress ? (
                <>
                  <p className="user-info__section-address-text">
                    {authUser.delivaryAddress.address}
                  </p>
                  <button
                    className="user-info__add-address-btn"
                    onClick={() => setModalAddresss("update")}
                  >
                    Изменить адрес
                  </button>
                  <DeliveryAddress
                    showModalAddress={checkoutState.modalAddress.show}
                    closeModal={closeModal}
                    action={checkoutState.modalAddress.action}
                    authUser={authUser}
                  />
                </>
              ) : (
                <>
                  <button
                    className="user-info__add-address-btn"
                    onClick={() => setModalAddresss("create")}
                  >
                    Добавить адрес
                  </button>
                  <DeliveryAddress
                    showModalAddress={checkoutState.modalAddress.show}
                    closeModal={closeModal}
                    action={checkoutState.modalAddress.action}
                    authUser={authUser}
                  />
                </>
              )}
            </section>

            <section className="user-info__section comment">
              <h3 className="user-info__section-title">
                3. Пожелания к заказу
              </h3>
              <Input
                name="comment"
                initialValue={checkoutState.customerComment}
                placeholder="Комментарий *"
                onInputChange={onInputChange}
                type="text"
                hasError={false}
              />
            </section>

            <section className="user-info__section payment-method">
              <h3 className="user-info__section-title">4. Способы оплаты</h3>
              <ul className="user-info__section-payment-method-list">
                {paymentMethods.map((method) => (
                  <li
                    key={method.id}
                    className={`user-info__section-payment-method-item ${
                      checkoutState.paymentMethod === method.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div className="user-info__section-payment-method-icon">
                      <method.logo />
                    </div>
                    <h4 className="user-info__section-payment-method-name">
                      {method.title}
                    </h4>
                  </li>
                ))}
                <li
                  className={`user-info__section-payment-method-item ${
                    checkoutState.paymentMethod === "sbp" ? "selected" : ""
                  }`}
                  onClick={() => setPaymentMethod("sbp")}
                >
                  <div className="user-info__section-payment-method-icon">
                    <Image
                      src={spbIcon}
                      alt="An icon for SBP payment system"
                      fill
                    />
                  </div>
                </li>
              </ul>
            </section>
          </>
        ) : (
          <AuthenticationBlock />
        )}
      </div>

      <div className="checkout__order-info">
        <div className="order-info__cart-items">
          {cart?.cartItems!.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} mode="read-only" />
          ))}
        </div>

        <div className="order-info__summary">
          <div className="order-info__summary-row">
            <h5 className="order-info__summary-label">Сумма заказа</h5>
            <span className="order-info__summary-value">
              {cart?.subTotal} ₽
            </span>
          </div>

          <div className="order-info__summary-row">
            {checkoutState.deliveryCost ? (
              <>
                <h5 className="order-info__summary-label">Доставка</h5>
                <span className="order-info__summary-value">
                  {checkoutState.deliveryCost} ₽
                </span>
              </>
            ) : null}
          </div>

          <div className="order-info__summary-divider" />

          <div className="order-info__summary-row">
            <h5 className="order-info__summary-label">Итог</h5>
            <span className="order-info__summary-value">
              {checkoutState.orderTotalAmount} ₽
            </span>
          </div>

          <button
            className="checkout__button"
            onClick={() => checkoutOrder()}
            disabled={!isCheckout || loading}
          >
            {loading ? (
              <div className="check-loader"></div>
            ) : (
              `ОПЛАТИТЬ ${checkoutState.orderTotalAmount || cart?.subTotal} ₽`
            )}
          </button>
          <p className="checkout__legal">
            нажимая кнопку вы соглашаетесь{" "}
            <Link href="/policy">
              с согласием на обработку персональных данных
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
