"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, redirect, RedirectType } from "next/navigation";
import Input from "@/components/input/Input";
import { useReactiveVar, useMutation } from "@apollo/client/react";
import SberPayIcon from "@/components/icons/SberPayIcon";
import TBankPayIcon from "@/components/icons/TBankPayIcon";
import CreditCardIcon from "@/components/icons/CreditCardIcon";
import CartItem from "@/components/cart/cart-item/CartItem";
import AuthenticationBlock from "./authentication-block/AuthenticationBlock";
import DeliveryAddress from "./delivery-address/DeliveryAddress";
import { cartVar, userVar } from "@/lib/cache";
import { CHECKOUT_ORDER } from "./operation";
import { GET_CART_QUERY } from "@/components/cart/operations";
import { AUTHORIZED_USER_QUERY } from "@/components/header/user-menu/operation";
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

function Checkout() {
  const cart = useReactiveVar(cartVar);
  const authUser = useReactiveVar(userVar);
  const router = useRouter();

  const [customerComment, setCustomerComment] = useState("");
  const [activePayment, setActivePayment] =
    useState<PaymentMethodId>("bank_card");
  const [showModalAddress, setShowModalAddress] = useState(false);

  const handleSetShowModalAddresss = () => {
    setShowModalAddress(!showModalAddress);
  };

  const onInputChange = ({ value }: { name: string; value: string }) => {
    setCustomerComment(value);
  };

  const [checkoutOrder, { loading }] = useMutation(CHECKOUT_ORDER, {
    variables: {
      deliveryAddressId: authUser?.delivaryAddress![0]?.id,
      shippingCost: 500,
      paymentMethod: activePayment,
      customerNote: customerComment,
    },
    onCompleted(data) {
      console.log("Here is your data -> ", data.checkOut);
      const paymentUrl = data.checkOut.redirectUrl!;
      router.push(paymentUrl);
    },
    onError(error) {
      console.error("Error occur when try to checout order -> ", error);
    },
    refetchQueries: [GET_CART_QUERY, AUTHORIZED_USER_QUERY],
  });

  if (!cart) {
    redirect("/", RedirectType.replace);
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
              {authUser.delivaryAddress &&
              authUser.delivaryAddress.length > 0 ? (
                <p className="user-info__section-address-text">
                  {authUser.delivaryAddress[0].street}
                </p>
              ) : (
                <>
                  <button
                    className="user-info__add-address-btn"
                    onClick={handleSetShowModalAddresss}
                  >
                    Добавить адрес
                  </button>
                  <DeliveryAddress
                    showModalAddress={showModalAddress}
                    handleShowModalAddress={handleSetShowModalAddresss}
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
                initialValue={customerComment}
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
                      activePayment === method.id ? "selected" : ""
                    }`}
                    onClick={() =>
                      setActivePayment(method.id as PaymentMethodId)
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
                    activePayment === "sbp" ? "selected" : ""
                  }`}
                  onClick={() => setActivePayment("sbp")}
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
            <span className="order-info__summary-value">500 ₽</span>
          </div>

          <div className="order-info__summary-divider" />

          <div className="order-info__summary-row">
            <h5 className="order-info__summary-label">Итог</h5>
            <span className="order-info__summary-value">
              {cart?.subTotal} ₽
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
              `ОПЛАТИТЬ ${cart?.subTotal} ₽`
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
