import Image from "next/image";
import Link from "next/link";
import Button from "@/components/button/Button";
import customizeInfoImage from "./customize-info-image.jpg";
import "./customize-info.scss";

function CustomizeInfo() {
  const tlUrl = new URL("https://t.me/Ell_Cakes");
  tlUrl.searchParams.set("text", "Здравствуйте! Хочу оформить заказ");

  return (
    <section className="customize-info">
      <div className="customize-info__image-container">
        <Image
          src={customizeInfoImage}
          alt="An image presting an information about cake customisation"
          fill
          className="customize-info__image"
          data-testid="customize-info-image"
        />
      </div>
      <div className="customize-info__text-wrapper">
        <h3 className="customize-info__heading">
          Торт твоей мечты — по{" "}
          <Link href={tlUrl.toString()}>
            <span className="highlight">индивидуальному дизайну</span>
          </Link>
        </h3>
        <p className="customize-info__text" data-testid="customize-info-text">
          <span>
            У нас ты можешь заказать торт, который полностью отражает твой стиль
            и настроение праздника. Мы создадим уникальный десерт по твоим
            пожеланиям — от вкуса и формы до декора и надписи.
          </span>
          <span>
            Каждый торт — это ручная работа, внимание к деталям и любовь в
            каждом слое. Сделай свой праздник по-настоящему особенным!
          </span>
        </p>
        <div className="customize-info__btn-wrapper">
          <Button textKey="связаться" href="/contact" />
        </div>
      </div>
    </section>
  );
}

export default CustomizeInfo;
