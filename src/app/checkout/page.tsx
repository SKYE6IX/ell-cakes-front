"use client";
import { useEffect, useReducer } from "react";
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
import OrderReceiver from "./order-receiver/OrderReceiver";
import CartEmpty from "./CartEmpty";
import { CHECKOUT_ORDER } from "./operation";
import { GET_CART_QUERY } from "@/components/cart/operations";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import { calculateDeliveryPrice, getCoordinate } from "@/lib/y-map-common";
import { canCheckout } from "./canCheckout";
import { checkoutReducer, PaymentMethodId } from "./checkoutReducer";
import spbIcon from "./sbp-icon.png";
import { OrderDirection } from "@/types/__generated__/graphql";
import "./checkout.scss";

// TODO:
// 1. Write test for all component inside checkout

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

  const [checkoutState, dispatch] = useReducer(checkoutReducer, {
    paymentMethod: "bank_card",
    deliveryOption: "Интервал доставки (с 10:00 до 16:00)",
    deliveryDate: "",
    deliveryCost: 0,
    initialZonePrice: 990,
    customerComment: "",
    hasOrderReceiver: false,
    orderReceiver: {
      name: "",
      phoneNumber: "",
    },
    modalAddress: {
      show: false,
      mutationType: "create",
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

  // Derives the order receiver data
  const orderReceiverData =
    checkoutState.orderReceiver.name && checkoutState.orderReceiver.name
      ? checkoutState.orderReceiver
      : undefined;

  // Check for address delivary and calculate the price
  useEffect(() => {
    if (
      !authUser?.delivaryAddress?.address ||
      checkoutState.initialZonePrice == 0
    ) {
      dispatch({ type: "manage_delivery_cost", payload: 0 });
      return;
    }

    const { delivaryAddress } = authUser;
    const calculate = async () => {
      const coord = await getCoordinate(delivaryAddress.address!);
      const lng = coord?.geometry?.coordinates[0];
      const lat = coord?.geometry?.coordinates[1];
      if (!lng || !lat) {
        dispatch({ type: "manage_delivery_cost", payload: 0 });
        return;
      }
      const ROUTE_END: [number, number] = [lng, lat];
      const { price } = calculateDeliveryPrice(
        ROUTE_END,
        checkoutState.initialZonePrice
      );
      dispatch({ type: "manage_delivery_cost", payload: price });
    };

    calculate();
  }, [authUser, checkoutState.initialZonePrice]);

  // ON INPUT CHANGE FOR CLIENT COMMENT
  const onInputChange = ({ value }: { name: string; value: string }) => {
    dispatch({ type: "manage_client_comment_input", payload: value });
  };

  //CHECKOUT MUTATION
  const [checkoutOrder, { loading, error }] = useMutation(CHECKOUT_ORDER, {
    variables: {
      deliveryAddressId: authUser?.delivaryAddress?.id,
      shippingCost: checkoutState.deliveryCost,
      paymentMethod: checkoutState.paymentMethod,
      customerNote: checkoutState.customerComment,
      deliveryOption: checkoutState.deliveryOption,
      orderReceiver: orderReceiverData,
      deliveryDate: checkoutState.deliveryDate,
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

  const allowedToCheckout = canCheckout({
    ...checkoutState,
    userId: authUser?.id,
    deliveryAddressId: authUser?.delivaryAddress?.id,
  });

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

            <section className="user-info__section comment">
              <h3 className="user-info__section-title">2. Заказ в подарок</h3>
              <OrderReceiver dispatch={dispatch} />
            </section>

            <section className="user-info__section address">
              <h3 className="user-info__section-title">3. Адрес</h3>
              {authUser.delivaryAddress ? (
                <>
                  <p className="user-info__section-address-text">
                    {authUser.delivaryAddress.address}
                  </p>
                  <button
                    className="user-info__add-address-btn"
                    onClick={() =>
                      dispatch({
                        type: "manage_address_modal",
                        payload: "update",
                      })
                    }
                  >
                    Изменить адрес
                  </button>
                  <DeliveryAddress
                    showModalAddress={checkoutState.modalAddress.show}
                    mutationType={checkoutState.modalAddress.mutationType}
                    authUser={authUser}
                    dispatch={dispatch}
                  />
                </>
              ) : (
                <>
                  <button
                    className="user-info__add-address-btn"
                    onClick={() =>
                      dispatch({
                        type: "manage_address_modal",
                        payload: "create",
                      })
                    }
                  >
                    Добавить адрес
                  </button>
                  <DeliveryAddress
                    showModalAddress={checkoutState.modalAddress.show}
                    mutationType={checkoutState.modalAddress.mutationType}
                    authUser={authUser}
                    dispatch={dispatch}
                  />
                </>
              )}
            </section>

            <section className="user-info__section comment">
              <h3 className="user-info__section-title">
                4. Выберите время доставки
              </h3>
              <DeliveryOption dispatch={dispatch} />
            </section>

            <section className="user-info__section comment">
              <h3 className="user-info__section-title">
                5. Пожелания к заказу
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
              <h3 className="user-info__section-title">6. Способы оплаты</h3>
              <ul className="user-info__section-payment-method-list">
                {paymentMethods.map((method) => (
                  <li
                    key={method.id}
                    className={`user-info__section-payment-method-item ${
                      checkoutState.paymentMethod === method.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      dispatch({
                        type: "add_payment_method",
                        payload: method.id as PaymentMethodId,
                      })
                    }
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
                  onClick={() =>
                    dispatch({ type: "add_payment_method", payload: "sbp" })
                  }
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
            disabled={!allowedToCheckout || loading}
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
