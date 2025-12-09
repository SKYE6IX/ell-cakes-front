"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import Modal from "@/components/modal/Modal";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";

import dessertImage from "./dessert.jpeg";
import yookassaLogo from "@/../public/payment-icons/credit-card.png";
import sbpLogo from "@/../public/payment-icons/sbp.png";
import tpayLogo from "@/../public/payment-icons/tinkoff.png";
import sberPayLogo from "@/../public/payment-icons/sber.png";

import "./checkout.scss";

type CartItem = {
  id: string;
  title: string;
  weight: string;
  shape: string;
  price: number;
  image: StaticImageData;
};
type PaymentMethodId = "yookassa" | "sbp" | "tpay" | "sber";
type PaymentMethod = {
  id: PaymentMethodId;
  logo: StaticImageData;
  title: string;
};
type AuthView = "authorized" | "login" | "register";

const paymentMethods: PaymentMethod[] = [
  {
    id: "yookassa",
    logo: yookassaLogo,
    title: "Оплата через сервис ЮKassa",
  },
  {
    id: "sbp",
    logo: sbpLogo,
    title: "СБП",
  },
  {
    id: "tpay",
    logo: tpayLogo,
    title: "T-PAY",
  },
  {
    id: "sber",
    logo: sberPayLogo,
    title: "SBER PAY",
  },
];
const cartItems: CartItem[] = [
  {
    id: "1",
    title: "Сникерс",
    weight: "1000 г",
    shape: "Сердце",
    price: 3200,
    image: dessertImage,
  },
  {
    id: "2",
    title: "Ягодно-банановый мильфей",
    weight: "2000 г",
    shape: "Круг",
    price: 6400,
    image: dessertImage,
  },
];
const address = "Олонецкая, 4"
// const address = null

// Sum
const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
const deliveryPrice = 500;
const finalTotal = cartTotal + deliveryPrice;

function Checkout() {
  const [showModal, setShowModal] = useState(false);
  const handleSetShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const [authView, setAuthView] = useState<AuthView>("register");
  const [activePayment, setActivePayment] =
    useState<PaymentMethodId>("yookassa");

  return (
    <section className="checkout">
      <div className="checkout__inner">
        <div className="checkout__left">
          <section className="checkout__section">
            <h2 className="checkout__section-title">1. Мои данные</h2>

            {authView === "authorized" && (
              <>
                <p className="checkout__text">Анна</p>
                <p className="checkout__text">+7 (962) 958-64-74</p>
              </>
            )}

            {authView === "login" && (
              <div className="checkout__auth">
                <div className="checkout__auth-inputs">
                  <Input
                    name="login-email"
                    initialValue=""
                    placeholder="Почта"
                    type="email"
                    autoComplete="email"
                    onInputChange={() => {}}
                  />
                  <Input
                    name="login-password"
                    initialValue=""
                    placeholder="Пароль"
                    type="password"
                    autoComplete="current-password"
                    onInputChange={() => {}}
                  />
                </div>
                <button className="checkout__button">Войти</button>
                <button
                  className="checkout__button--additional"
                  onClick={() => setAuthView("register")}
                >
                  Нет аккаунта? Создать
                </button>
              </div>
            )}

            {authView === "register" && (
              <div className="checkout__auth">
                <div className="checkout__auth-inputs">
                  <Input
                    name="register-name"
                    initialValue=""
                    placeholder="Имя"
                    type="text"
                    autoComplete="name"
                    onInputChange={() => {}}
                  />
                  <Input
                    name="register-email"
                    initialValue=""
                    placeholder="Почта"
                    type="email"
                    autoComplete="email"
                    onInputChange={() => {}}
                  />
                  <Input
                    name="register-phone"
                    initialValue=""
                    placeholder="Телефон"
                    type="tel"
                    autoComplete="tel"
                    onInputChange={() => {}}
                  />
                  <Input
                    name="register-password"
                    initialValue=""
                    placeholder="Пароль"
                    type="password"
                    autoComplete="new-password"
                    onInputChange={() => {}}
                  />
                </div>
                <button className="checkout__button">Зарегистрироваться</button>
                <button
                  className="checkout__button--additional"
                  onClick={() => setAuthView("login")}
                >
                  Уже есть аккаунт
                </button>
              </div>
            )}
          </section>

          <section className="checkout__section">
            <h2 className="checkout__section-title">2. Адрес</h2>

            {address ? (
              <p className="checkout__text">
                {address}
              </p>
            ) : (
              <>
                <p className="checkout__text">
                  Адрес не указан
                </p>
                <button
                  className="checkout__button"
                  onClick={handleSetShowModal}
                >
                  Добавить адрес
                </button>
              </>
            )}
          </section>

          <section className="checkout__section">
            <h2 className="checkout__section-title">3. Пожелания к заказу</h2>
            <Input
              name="comment"
              initialValue=""
              placeholder="Комментарий *"
              onInputChange={()=>{}}
              type="text"
              autoComplete="off"
            />
          </section>

          <section className="checkout__section">
            <h2 className="checkout__section-title">4. Способы оплаты</h2>

            <div className="checkout__payments">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className={`checkout__payment${
                    activePayment === method.id
                      ? " checkout__payment--active"
                      : ""
                  }`}
                  onClick={() => setActivePayment(method.id)}
                >
                  <span className="checkout__payment-logo">
                    <Image
                      className="checkout__payment-logo-img"
                      src={method.logo}
                      alt={method.title}
                    />
                  </span>

                  <div className="checkout__payment-content">
                    {method.title}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="checkout__right">
          <div className="checkout__cart">
            {cartItems.map((item) => (
              <article className="checkout__cart-item" key={item.id}>
                <div className="checkout__cart-image-wrapper">
                  <Image
                    className="checkout__cart-image"
                    src={item.image}
                    alt={item.title}
                  />
                </div>

                <div className="checkout__cart-info">
                  <p className="checkout__cart-title">{item.title}</p>

                  <div className="checkout__cart-tags">
                    <p className="checkout__cart-tag">{item.weight}</p>
                    <p className="checkout__cart-tag">{item.shape}</p>
                  </div>

                  <p className="checkout__cart-price">
                    {item.price} ₽
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="checkout__summary">
            <div className="checkout__summary-row">
              <p className="checkout__summary-label">Сумма заказа</p>
              <p className="checkout__summary-value">
                {cartTotal} ₽
              </p>
            </div>
            <div className="checkout__summary-row">
              <p className="checkout__summary-label">Доставка</p>
              <p className="checkout__summary-value">
                {deliveryPrice} ₽
              </p>
            </div>

            <div className="checkout__summary-divider" />

            <div className="checkout__summary-row checkout__summary-row--bold">
              <p className="checkout__summary-label">Итог</p>
              <p className="checkout__summary-value checkout__summary-value--bold">
                {finalTotal} ₽
              </p>
            </div>
          </div>

          <Button
            textKey={`ОПЛАТИТЬ ${finalTotal} ₽`}
            href="/"
            fullWidth
          />

          <p className="checkout__legal">
            нажимая кнопку вы соглашаетесь{" "}
            <Link href="/policy">
              с согласием на обработку персональных данных
            </Link>
          </p>
        </aside>
      </div>

      <Modal
        showModal={showModal}
        headingText="Новый адрес"
        handleCloseModal={handleSetShowModal}
      >
        <div className="addresses-form">
          <Input
            name="address"
            initialValue=''
            placeholder="Адрес"
            type="text"
            autoComplete="street-address"
            onInputChange={()=>{}}
          />
          <Input
            name="floor"
            initialValue=''
            placeholder="Этаж"
            type="text"
            autoComplete="off"
            onInputChange={()=>{}}
          />
          <Input
            name="flat"
            initialValue=''
            placeholder="Квартира"
            type="text"
            autoComplete="off"
            onInputChange={()=>{}}
          />
          <Input
            name="intercom"
            initialValue=''
            placeholder="Домофон"
            type="text"
            autoComplete="off"
            onInputChange={()=>{}}
          />

          <div className="addresses-form__footer">
            <Button textKey="Добавить адрес" href="/" fullWidth />
          </div>
        </div>
      </Modal>
    </section>
  );
}

export default Checkout;
