"use client";
import React from "react";
import Link from "next/link";
import Instagram from "@/components/icons/Instagram";
import Vk from "@/components/icons/Vk";
import WhatsApp from "@/components/icons/WhatsApp";
import "./contact.scss";

function Contact() {
  return (
    <section className="contact">
      <div className="contact__inner-wrapper">
        <div className="contact__text-wrapper">
          <h2 className="contact__title">Свяжитесь с нами</h2>
          <p className="contact__text" data-testid="page-text">
            Мы будем рады вашим вопросам, предложениям и заказам!
          </p>
        </div>
        <div className="contact__link-wrapper">
          <div className="footer__link-wrapper-item">
            <div className="footer__link-wrapper-item__title">почта:</div>
            <Link
              href="mailto:info@ellcakes.net"
              className="footer__link-wrapper-item__text"
            >
              info@ellcakes.net
            </Link>
          </div>
          <div className="footer__link-wrapper-item">
            <div className="footer__link-wrapper-item__title">адрес:</div>
            <p
              className="footer__link-wrapper-item__text"
              data-testid="contact-address"
            >
              г. Москва, Жуков проезд, дом 8
            </p>
          </div>
          <div className="footer__link-wrapper-item">
            <div className="footer__link-wrapper-item__title">телефон:</div>
            <Link
              href="tel:+79651950599"
              className="footer__link-wrapper-item__text"
              data-testid="contact-phone"
            >
              8(965)-195-05-99
            </Link>
          </div>
          <div className="footer__link-wrapper-item">
            <div className="footer__link-wrapper-item__title">
              социальные сети:
            </div>
            <div>
              <Link className="footer__link-wrapper-item__link" href="/">
                <Instagram />
              </Link>
              <Link className="footer__link-wrapper-item__link" href="/">
                <Vk />
              </Link>
              <Link className="footer__link-wrapper-item__link" href="/">
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
