"use client";
import { useState } from "react";
import Link from "next/link";
import { gql, TypedDocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import Telegram from "@/components/icons/Telegram";
import Instagram from "@/components/icons/Instagram";
import WhatsApp from "@/components/icons/WhatsApp";
import Input from "@/components/input/Input";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import Loader from "@/components/loader/Loader";
import "./contact.scss";

const REQUEST_CALL: TypedDocumentNode<{ requestCall: string }, { phoneNumber: string }> = gql`
  mutation RequestForCustomCake($phoneNumber: String!) {
    requestCall(phoneNumber: $phoneNumber)
  }
`;

function Contact() {
  const url = new URL("https://t.me/Ell_Cakes");
  url.searchParams.set("text", "Здравствуйте! Хочу оформить заказ");
  const tlUrl = url.toString().replace(/\+/g, "%20");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [showInputError, setShowInputError] = useState(false);

  const onInputChange = ({ value }: { name: string; value: string }) => {
    setShowInputError(false);
    setPhoneNumber(value);
  };

  const [requestCall, { loading }] = useMutation(REQUEST_CALL, {
    variables: {
      phoneNumber,
    },
    onCompleted() {
      setPhoneNumber("");
      alert("Message Sent! 🚀");
    },
  });

  const handleSubmitRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setShowInputError(true);
      return;
    }
    requestCall();
  };

  return (
    <section className="contact">
      <div className="contact__inner-wrapper">
        <div className="contact__text-wrapper">
          <h2 className="contact__title">Свяжитесь с нами</h2>
          <p className="contact__text" data-testid="page-text">
            Мы будем рады вашим вопросам, предложениям и заказам!
          </p>

          <form className="contact__form-wrapper" onSubmit={handleSubmitRequest}>
            <Input
              value={phoneNumber ? formatPhoneNumber(phoneNumber) : ""}
              name="phoneNumber"
              placeholder="Телефон"
              type="tel"
              onInputChange={onInputChange}
              hasError={showInputError}
            />

            <button className="contact__form-btn" type="submit" disabled={loading}>
              {loading ? <Loader /> : "Отправить"}
            </button>
          </form>
        </div>

        <div className="contact__link-wrapper">
          <div className="footer__link-wrapper-item">
            <h4 className="footer__link-wrapper-item__title">Сотрудничество:</h4>
            <Link href="/collaboration" className="footer__link-wrapper-item__text underline">
              Давайте сотрудничать.
            </Link>
          </div>

          <div className="footer__link-wrapper-item">
            <h4 className="footer__link-wrapper-item__title">Почта:</h4>
            <Link
              href="mailto:ellcakesofficial@gmail.com"
              className="footer__link-wrapper-item__text underline"
            >
              ellcakesofficial@gmail.com
            </Link>
          </div>

          <div className="footer__link-wrapper-item">
            <h4 className="footer__link-wrapper-item__title">Адрес:</h4>
            <p className="footer__link-wrapper-item__text" data-testid="contact-address">
              Котельники, ул. Кузьминская, 17
            </p>
          </div>

          <div className="footer__link-wrapper-item">
            <h4 className="footer__link-wrapper-item__title">Связаться:</h4>
            <Link
              href={tlUrl}
              target="_blank"
              className="footer__link-wrapper-item__text underline"
            >
              Написать в Telegram
            </Link>
          </div>

          <div className="footer__link-wrapper-item">
            <h4 className="footer__link-wrapper-item__title">Телефон:</h4>
            <Link
              href="tel:+79651950599"
              className="footer__link-wrapper-item__text underline"
              data-testid="contact-phone"
            >
              +7(965)-195-05-99
            </Link>
          </div>

          <div className="footer__link-wrapper-item">
            <h4 className="footer__link-wrapper-item__title">Социальные сети:</h4>
            <div>
              <Link
                className="footer__link-wrapper-item__link"
                target="_blank"
                href="https://t.me/by_ellcakes"
              >
                <Telegram />
              </Link>
              <Link
                className="footer__link-wrapper-item__link"
                target="_blank"
                href="https://www.instagram.com/ell_cakes?igsh=aTBobjM1cXYzc2Y4"
              >
                <Instagram />
              </Link>
              <Link
                className="footer__link-wrapper-item__link"
                target="_blank"
                href="https://wa.me/79651950599"
              >
                <WhatsApp />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Contact;
