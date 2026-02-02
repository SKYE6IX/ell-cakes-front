"use client";
import { useState, useEffect } from "react";
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
import DeliveryOption from "./delivery-option/DeliveryOption";
import CartEmpty from "./CartEmpty";
import { CHECKOUT_ORDER } from "./operation";
import { GET_CART_QUERY } from "@/components/cart/operations";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import { calculateDeliveryPrice, getCoordinate } from "@/lib/y-map-common";
import { canCheckout } from "./canCheckout";
import spbIcon from "./sbp-icon.png";
import { OrderDirection } from "@/types/__generated__/graphql";
import "./checkout.scss";

// TODO:
// 1. Write test for all component inside checkout
type DeliveryOptionType = {
  key: "regular-time" | "in-between-time" | "fixed-time";
  chosenTime?: string;
};

type PaymentMethodId = "bank_card" | "sbp" | "tinkoff_bank" | "sberbank";
interface CheckoutState {
  paymentMethod: PaymentMethodId;
  deliveryOption: string;
  deliveryCost: number;
  initialZonePrice: number;
  customerComment: string;
  modalAddress: {
    show: boolean;
    action: "create" | "update";
  };
}

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

function Checkout() {
  const router = useRouter();

  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    paymentMethod: "bank_card",
    deliveryOption: "Интервал доставки (с 10:00 до 16:00)",
    deliveryCost: 0,
    initialZonePrice: 990,
    customerComment: "",
    modalAddress: {
      show: false,
      action: "create",
    },
  });

  // query USER data
  const { data: authResult } = useQuery(AUTHORIZED_USER_QUERY);
  const authUser = authResult?.queryAuthorizedUser;

  // query CART data
  const { data: cartResult } = useQuery(GET_CART_QUERY, {
    variables: {
      cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
      orderImagesBy: [{ createdAt: OrderDirection.Asc }],
    },
  });
  const cart = cartResult?.queryCart;

  // CALCULATE ORDER TOTAL AMOUNT
  const subTotal = cart?.subTotal ?? 0;
  const orderTotalAmount = subTotal + checkoutState.deliveryCost;

  // Check for address delivary and calculate the price
  useEffect(() => {
    if (!authUser?.delivaryAddress?.address) {
      setCheckoutState((prvState) => ({
        ...prvState,
        deliveryCost: 0,
      }));
      return;
    }

    const { delivaryAddress } = authUser;

    const calculate = async () => {
      const coord = await getCoordinate(delivaryAddress.address!);
      const lng = coord?.geometry?.coordinates[0];
      const lat = coord?.geometry?.coordinates[1];
      if (!lng || !lat) {
        setCheckoutState((prvState) => ({
          ...prvState,
          deliveryCost: 0,
        }));
        return;
      }
      const ROUTE_END: [number, number] = [lng, lat];

      const { price } = calculateDeliveryPrice(
        ROUTE_END,
        checkoutState.initialZonePrice
      );
      setCheckoutState((prvState) => ({
        ...prvState,
        deliveryCost: price,
      }));
    };
    calculate();
  }, [authUser, checkoutState.initialZonePrice]);

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

  const handleOnDeliveryOptionSet = ({
    key,
    chosenTime,
  }: DeliveryOptionType) => {
    switch (key as DeliveryOptionType["key"]) {
      case "regular-time":
        setCheckoutState((prvState) => ({
          ...prvState,
          initialZonePrice: 990,
          deliveryOption: "Интервал доставки (с 10:00 до 16:00)",
        }));
        break;
      case "in-between-time":
        setCheckoutState((prvState) => ({
          ...prvState,
          initialZonePrice: 1290,
          deliveryOption: `Выбрать интервал доставки (${chosenTime})`,
        }));
        break;
      case "fixed-time":
        setCheckoutState((prvState) => ({
          ...prvState,
          initialZonePrice: 1590,
          deliveryOption: `Доставка ко времени(${chosenTime})`,
        }));
        break;
      default:
        setCheckoutState((prvState) => ({
          ...prvState,
          initialZonePrice: 990,
          deliveryOption: "Интервал доставки (с 10:00 до 16:00)",
        }));
    }
  };

  //CHECKOUT MUTATION
  const [checkoutOrder, { loading, error }] = useMutation(CHECKOUT_ORDER, {
    variables: {
      deliveryAddressId: authUser?.delivaryAddress?.id,
      shippingCost: checkoutState.deliveryCost,
      paymentMethod: checkoutState.paymentMethod,
      customerNote: checkoutState.customerComment,
      deliveryOption: checkoutState.deliveryOption,
    },
    onCompleted(data) {
      const paymentUrl = data.checkOut.redirectUrl!;
      const confirmationUrl = data.checkOut.confirmationUrl!;

      window.history.replaceState({}, "", confirmationUrl);
      router.push(paymentUrl);
    },
    onError(error) {
      console.error("Error occur when try to checout order -> ", error);
    },
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
      {/* CURRENT AUTHORIZED USER DETAILS*/}
      <div className="checkout__user-info">
        {authUser && authUser.isUserVerified ? (
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
                3. Выберите время доставки
              </h3>
              <DeliveryOption onDeliveryOptionSet={handleOnDeliveryOptionSet} />
            </section>

            <section className="user-info__section comment">
              <h3 className="user-info__section-title">
                4. Пожелания к заказу
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
              <h3 className="user-info__section-title">5. Способы оплаты</h3>
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
          <AuthenticationBlock authUser={authUser} />
        )}
      </div>

      {/* CART ITEMS WITH PAYMENT DETAILS */}
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
              {orderTotalAmount} ₽
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
              `ОПЛАТИТЬ ${orderTotalAmount} ₽`
            )}
          </button>

          {error && (
            <span className="checkout__error-message">
              Произошла ошибка! Пожалуйста, попробуйте еще раз.
            </span>
          )}

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
