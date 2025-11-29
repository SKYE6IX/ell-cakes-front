"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../button/Button";
import "./footer.scss";
import logo from "./logo.png";
import Instagram from "../icons/Instagram";
import Vk from "../icons/Vk";
import WhatsApp from "../icons/WhatsApp";

function Footer() {
  const navLinks = [
    { name: "Торты", href: "/" },
    { name: "Пироженые", href: "/" },
    { name: "Доставка и оплата", href: "/delivery" },
    { name: "FAQ", href: "/faq" },
    { name: "Сотрудничество", href: "/collaboration" },
    { name: "Контакты", href: "/contact" },
  ];

  return (
    <footer className="footer">
      <div className="footer__inner-wrapper">
        <div className="footer__top-section">
          <div className="footer__link-wrapper">
            <div className="footer__nav">
              <h3 className="footer__title">
                Сделай свой праздник ещё слаще вместе с нашей кондитерской!
              </h3>
              <Button textKey="Заказать" href="/" />
              <ul className="footer__link-list">
                {navLinks.map((nav) => (
                  <li key={nav.name} className="footer__link-list-item">
                    <Link href={nav.href} data-testid="footer-nav">
                      {nav.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="footer__contact-title">Будем на связи!</h5>
              <ul className="footer__contact-list">
                <li className="footer__contact-list-item">
                  <Link href="mailto:info@ellcakes.net">info@ellcakes.net</Link>
                </li>
                <li className="footer__contact-list-item">
                  <Link href="tel:+79651950599">+7(965)-195-05-99</Link>
                </li>
                <li className="footer__contact-list-item">
                  Москва, Жуков проезд, дом 8
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__social-media-wrapper">
            <div>
              <Link className="footer__social-media-item" href="/">
                <Instagram />
              </Link>
              <Link className="footer__social-media-item" href="/">
                <Vk />
              </Link>
              <Link className="footer__social-media-item" href="/">
                <WhatsApp />
              </Link>
            </div>
            <Image
              className="footer__social-media-logo"
              src={logo}
              alt="EllCakes logo"
              data-testid="footer-logo"
            />
          </div>
        </div>
        <div className="footer__line"></div>
        <div className="footer__bottom-section">
          <h2 className="footer__bottom-title">EllCakes</h2>
          <Link href="/privacy-policy" className="footer__bottom-text">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
