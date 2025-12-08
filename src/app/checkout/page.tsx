"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
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
type Address = {
  id: number;
  text: string;
};

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
const paymentMethods: PaymentMethod[] = [
  {
    id: "yookassa",
    logo: yookassaLogo,
    title: "Онлайн-оплата через сервис ЮKassa",
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
const addressesMock: Address[] = [
  { id: 1, text: "г. Москва, Олонецкая 4, кв 475" },
  { id: 2, text: "г. Москва, Олонецкая 5, кв 476" },
];

//Sum
const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
const deliveryPrice = 500;
const finalTotal = cartTotal + deliveryPrice;

function Checkout() {
  const [showModal, setShowModal] = useState(false);
  const handleSetShowModal = () => {
    setShowModal(!showModal);
  };

  const [activePayment, setActivePayment] =
    useState<PaymentMethodId>("yookassa");

  const [addresses] = useState<Address[]>(addressesMock);
  const [activeAddressId, setActiveAddressId] = useState<number>(
      addressesMock[0]?.id ?? 0
  );

  const [formState, setFormState] = useState({
    comment: "",
  });

  const onInputChange = ({ name, value }: { name: string; value: string }) => {
    setFormState((prvState) => ({
      ...prvState,
      [name]: value,
    }));
  };

  return (
    <section className="checkout">
      <div className="checkout__inner">
        {/* LEFT COLUMN */}
        <div className="checkout__left">
          <section className="checkout__section">
            <h2 className="checkout__section-title">
              <span className="checkout__section-number">1.</span>
              <span>Личная информация</span>
            </h2>
            <div className="checkout__text checkout__text--name">Анна</div>
          </section>

          <section className="checkout__section">
            <h2 className="checkout__section-title">
              <span className="checkout__section-number">2.</span>
              <span>Адреса</span>
            </h2>

            <button
              type="button"
              className="checkout__add-address-button"
              onClick={handleSetShowModal}
            >
              Добавить адрес
            </button>
              <Modal
                showModal={showModal}
                headingText="Адреса"
                handleCloseModal={handleSetShowModal}
              >
                <div className="addresses-modal">
                  <button className="addresses-modal__add-button">Добавить адрес</button>

                  <ul className="addresses-modal__list">
                    {addresses.map((address) => {
                      const isActive = address.id === activeAddressId;

                      return (
                        <li
                          key={address.id}
                          className={`addresses-modal__item`}
                          onClick={() => setActiveAddressId(address.id)}
                        >
                          <span
                            className={`addresses-modal__radio${
                              isActive ? " addresses-modal__radio--active" : ""
                            }`}
                          ></span>

                          <span className="addresses-modal__text">{address.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Modal>
          </section>

          <section className="checkout__section">
            <Input
              name="comment"
              initialValue={formState.comment}
              placeholder="Комментарий *"
              onInputChange={onInputChange}
              type="text"
              autoComplete="off"
            /> 
          </section>

          <section className="checkout__section">
            <h2 className="checkout__section-title">
              <span className="checkout__section-number">3.</span>
              <span>Способы оплаты</span>
            </h2>

            <div className="checkout__payments">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
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

        {/* RIGHT COLUMN */}
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
                  <div className="checkout__cart-title">{item.title}</div>

                  <div className="checkout__cart-tags">
                    <span className="checkout__cart-tag">{item.weight}</span>
                    <span className="checkout__cart-tag">{item.shape}</span>
                  </div>

                  <div className="checkout__cart-price">{item.price} ₽</div>
                </div>
              </article>
            ))}
          </div>

          <div className="checkout__summary">
            <div className="checkout__summary-row">
              <span className="checkout__summary-label">Сумма заказа</span>
              <span className="checkout__summary-value">{cartTotal} ₽</span>
            </div>
            <div className="checkout__summary-row">
              <span className="checkout__summary-label">Доставка</span>
              <span className="checkout__summary-value">{deliveryPrice} ₽</span>
            </div>

            <div className="checkout__summary-divider" />

            <div className="checkout__summary-row checkout__summary-row--total">
              <span className="checkout__summary-label">Итог</span>
              <span className="checkout__summary-value checkout__summary-value--accent">
                {finalTotal} ₽
              </span>
            </div>
          </div>

          <Button textKey={`ОПЛАТИТЬ ${finalTotal} ₽`} href="/" fullWidth />

          <p className="checkout__legal">
            нажимая кнопку вы соглашаетесь{" "}
            <Link href="/policy">
              с согласием на обработку персональных данных
            </Link>
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
