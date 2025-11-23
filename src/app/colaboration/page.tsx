import Image from "next/image";
import dessertImage from "./dessert.jpg";
import "./colaboration.scss";
import Button from "@/components/button/Button";

function Colaboration() {
  return (
    <>
      <section className="colaboration">
        <div className="colaboration__inner-wrapper">
          <div className="colaboration__text-wrapper">
            <h2 className="colaboration__title">Сотрудничество</h2>
            <p className="colaboration__text">
              Партнерская программа EllCakes совершенно бесплатна и позволяет
              участникам получать дополнительный доход, путем размещения ссылок
              как на Наш магазин EllCakes или на отдельные товары. Каждая
              покупка, совершенная по партнерской ссылке, приносит агентскую
              комиссию. Стандартный размер комиссии составляет 5%.
            </p>
            <p className="colaboration__text">
              За подробной информацией свяжитесь с нами по номеру телефона или
              по почте.
            </p>
            <Button textKey="Связаться" href="/" />
          </div>

          <div className="colaboration__media">
            <Image
              className="colaboration__image"
              src={dessertImage}
              alt="birthday cake"
              fill
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}
export default Colaboration;
