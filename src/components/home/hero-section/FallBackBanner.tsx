import React from "react";
import Image from "next/image";
import mockImage from "./mock-image.jpg";
import Button from "@/components/button/Button";
import "./hero-section.scss";

function FallBackBanner() {
  return (
    <section className="hero">
      <ul className="hero__media">
        <li className="hero__images-wrapper">
          <div className="hero__image-container">
            <Image
              src={mockImage}
              alt="Mock Image"
              fill
              className="hero__product-image"
              data-testid="hero-banner-image"
              loading="lazy"
            />
          </div>
          <div className="hero__image-container">
            <Image
              src={mockImage}
              alt="Mock Image"
              fill
              className="hero__product-image"
              data-testid="hero-banner-image"
              loading="lazy"
            />
          </div>
        </li>
      </ul>
      <div className="hero__info">
        <h3 className="hero__product-name">Создаём сладкие моменты</h3>
        <p className="hero__product-description" data-testid="hero-banner-text">
          Десерты, приготовленные вручную из натуральных ингредиентов! Для
          праздников, подарков и просто хорошего настроения - красиво, вкусно и
          всегда вовремя!
        </p>
        <Button textKey="ЗАказать" />
      </div>
    </section>
  );
}

export default FallBackBanner;
