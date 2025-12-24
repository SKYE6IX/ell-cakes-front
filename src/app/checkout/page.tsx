"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, redirect, RedirectType } from "next/navigation";
import { useReactiveVar, useMutation } from "@apollo/client/react";
import Input from "@/components/input/Input";
import SberPayIcon from "@/components/icons/SberPayIcon";
import TBankPayIcon from "@/components/icons/TBankPayIcon";
import CreditCardIcon from "@/components/icons/CreditCardIcon";
import CartItem from "@/components/cart/cart-item/CartItem";
import AuthenticationBlock from "./authentication-block/AuthenticationBlock";
import DeliveryAddress from "./delivery-address/DeliveryAddress";
import { cartVar, userVar } from "@/lib/cache";
import { CHECKOUT_ORDER } from "./operation";
import { GET_CART_QUERY } from "@/components/cart/operations";
import { AUTHORIZED_USER_QUERY } from "@/components/header/operation";
import { calculateDeliveryPrice, getCoordinate } from "@/lib/y-map-common";
import spbIcon from "./sbp-icon.png";
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
  const cart = useReactiveVar(cartVar);
  const authUser = useReactiveVar(userVar);
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

  // Check for address delivary and calculate the price
  const handleSetDleiveryCost = useCallback(
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
      handleSetDleiveryCost(userAddress!, cart.subTotal!);
    }
  }, [authUser, cart, handleSetDleiveryCost]);

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

  if (!cart) {
    // redirect("/", RedirectType.replace);
  }

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
            <h5 className="order-info__summary-label">Доставка</h5>
            <span className="order-info__summary-value">
              {checkoutState.deliveryCost} ₽
            </span>
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
            disabled={loading}
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
