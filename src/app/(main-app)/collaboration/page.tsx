import Image from "next/image";
import dessertImage from "./dessert.jpg";
import Button from "@/components/button/Button";
import "./collaboration.scss";

function Collaboration() {
  return (
    <section className="colaboration">
      <div className="colaboration__text-wrapper">
        <h2 className="colaboration__title">Мы открыты к сотрудничеству!</h2>
        <p className="colaboration__text" data-testid="page-text">
          Предлагаем партнёрство для:
        </p>
        <p className="colaboration__text">
          - кафе и ресторанов<br/>
          - фотостудий и организаторов мероприятий<br/>
          - корпоративных клиентов<br/>
          - свадебных и праздничных агентств
        </p>
        <p className="colaboration__text">
          Гарантируем индивидуальный подход, стабильное качество и сладкие условия сотрудничества.
        </p>
        <p className="colaboration__text">
          Свяжитесь с нами - будем рады обсудить детали!
        </p>
        <Button textKey="Связаться" tagre-="_blank" href="https://clck.ru/3Rgodu" />
      </div>

      <div className="colaboration__media">
        <Image
          className="colaboration__image"
          src={dessertImage}
          alt="birthday cake"
          fill
          priority
          data-testid="page-image"
        />
      </div>
    </section>
  );
}
export default Collaboration;
