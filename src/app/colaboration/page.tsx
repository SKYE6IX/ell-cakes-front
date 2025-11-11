import React from "react";
import Image from "next/image";
import showcaseImage1 from "../../../public/desserts-images/showcase1.jpg" //have quastion about path
import "./colaboration.scss";
import Button from "@/components/button/Button";


function Colaboration() {
   return ( 
    <section className="colaboration">
      <div className="colaboration__container">
        <div className="colaboration__content">
          <h2 className="colaboration__title">Сотрудничество</h2>
          <p className="colaboration__text">Партнерская программа EllCakes совершенно бесплатна и позволяет участникам получать дополнительный доход, путем размещения ссылок как на Наш магазин EllCakes или на отдельные товары. Каждая покупка, совершенная по партнерской ссылке, приносит агентскую комиссию. Стандартный размер комиссии составляет 5%.</p>
          <p className="colaboration__text">
            За подробной информацией свяжитесь с нами по номеру телефона или по почте.
          </p>
          <Button textKey="Связаться" href="/"/>
        </div>

        <div className="colaboration__media">
          <Image className="colaboration__image" src={showcaseImage1} alt="birthday cake" fill priority />
        </div>
      </div>
    </section>
   );
}
export default Colaboration;
