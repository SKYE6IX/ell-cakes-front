import Link from "next/link";
import Instagram from "@/components/icons/Instagram";
import Vk from "@/components/icons/Vk";
import WhatsApp from "@/components/icons/WhatsApp";
import RequestCall from "./request-call/RequestCall";
import "./contact.scss";

function Contact() {
  const url = new URL("https://t.me/Ell_Cakes");
  url.searchParams.set("text", "Здравствуйте! Хочу оформить заказ");
  const tlUrl = url.toString().replace(/\+/g, "%20");

  return (
    <section className="contact">
      <div className="contact__inner-wrapper">
        <div className="contact__text-wrapper">
          <h2 className="contact__title">Свяжитесь с нами</h2>
          <p className="contact__text" data-testid="page-text">
            Мы будем рады вашим вопросам, предложениям и заказам!
          </p>

          <RequestCall />
        </div>

        <div className="contact__link-wrapper">
          <div className="footer__link-wrapper-item">
            <h4 className="footer__link-wrapper-item__title">почта:</h4>
            <Link
              href="mailto:info@ellcakes.net"
              className="footer__link-wrapper-item__text underline"
            >
              info@ellcakes.net
            </Link>
          </div>

          <div className="footer__link-wrapper-item">
            <h4 className="footer__link-wrapper-item__title">адрес:</h4>
            <p
              className="footer__link-wrapper-item__text"
              data-testid="contact-address"
            >
              Московская область, город Котельники, ул. Кузьминская, 17
            </p>
          </div>

          <div className="footer__link-wrapper-item">
            <h4 className="footer__link-wrapper-item__title">связаться:</h4>
            <Link
              href={tlUrl}
              target="_blank"
              className="footer__link-wrapper-item__text underline"
            >
              Написать в Telegram
            </Link>
          </div>

          <div className="footer__link-wrapper-item">
            <h4 className="footer__link-wrapper-item__title">телефон:</h4>
            <Link
              href="tel:+79651950599"
              className="footer__link-wrapper-item__text underline"
              data-testid="contact-phone"
            >
              8(965)-195-05-99
            </Link>
          </div>

          <div className="footer__link-wrapper-item">
            <h4 className="footer__link-wrapper-item__title">
              социальные сети:
            </h4>
            <div>
              <Link
                className="footer__link-wrapper-item__link"
                target="_blank"
                href="https://www.instagram.com/ell_cakes?igsh=aTBobjM1cXYzc2Y4"
              >
                <Instagram />
              </Link>
              <Link className="footer__link-wrapper-item__link" href="/">
                <Vk />
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
