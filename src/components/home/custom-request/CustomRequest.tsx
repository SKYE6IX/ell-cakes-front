"use client";
import React from "react";
import "./custom-request.scss";

function CustomRequest() {
  return (
    <section className="custom-request">
      <h3 className="custom-request__heading">Хотите создать свой собственный торт?</h3>
      <p className="custom-request__body">
        Мы делаем торты на заказ в Москве! Если у вас есть представление о том, как должен выглядеть
        ваш идеальный торт, мы готовы сделать торт по индивидуальному дизайну!
      </p>
      <button className="custom-request__button">Хочу со своим дизайном</button>
    </section>
  );
}

export default CustomRequest;
