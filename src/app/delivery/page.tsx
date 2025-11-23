import React from "react";
import Image from "next/image";
import dessertImage from "./dessert.jpeg";
import "./delivery.scss";

function Delivery() {
  return (
    <section className="delivery">
      <div className="delivery__inner-wrapper">
        <div className="delivery__text-wrapper">
          <h2 className="delivery__title">Доставка</h2>
          <p className="delivery__text">
            Курьерская доставка работает ежедневно с 10:00 до 17:00.
          </p>
          <p className="delivery__text">
            Стоимость — 990 руб. по Москве в пределах МКАД, за его пределами —
            50 руб. за километр (по картам Яндекс). Если ожидание курьера
            превышает 10 минут, взимается доплата 15 руб./мин. Для заказов более
            5 коробок или весом свыше 7 кг стоимость доставки уточняется у
            менеджера.
          </p>
        </div>

        <div className="delivery__media">
          <Image
            className="delivery__image"
            src={dessertImage}
            alt="birthday cake"
            fill
            priority
          />
        </div>
      </div>
    </section>
  );
}
export default Delivery;
