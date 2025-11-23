"use client";
import React from "react";
import Image from "next/image";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import "./hero-section.scss";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__media">
        <div className="hero__images-wrapper">
          <div className="hero__image-container"></div>
          <div className="hero__image-container"></div>
        </div>
      </div>
      <div className="hero__info">
        <h5 className="hero__product-badge">Хит продаж</h5>
        <h3 className="hero__product-name">Птичье молоко</h3>
        <p className="hero__product-description">
           Воздушное сливочное суфле со свежей клубникой или малиной внутри,
          тонкие прослойки фирменного бисквита и вкуснейший молочный шоколад.
        </p>
        {/* Button */}
        <div className="hero__carousel-control">
          <button className="hero__carousel-btn">
            <ArrowLeftIcon />
          </button>
          <button className="hero__carousel-btn">
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
