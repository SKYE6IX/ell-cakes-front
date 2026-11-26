import Image from "next/image";
import Link from "next/link";
import Button from "@/components/button/Button";
import customizeInfoImage from "./customize-info-image.jpg";
import "./customize-info.scss";

function CustomizeInfo() {
  const url = new URL("https://t.me/Ell_Cakes");
  url.searchParams.set("text", "Здравствуйте! Хочу оформить заказ");

  const tlUrl = url.toString().replace(/\+/g, "%20");

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
          <Link href={tlUrl}>
            <span className="highlight">Эксклюзивный дизайн</span>
          </Link>{" "}
          для вашего праздника
        </h3>
        <p className="customize-info__text" data-testid="customize-info-text">
          <span>
            Создадим торт, который идеально впишется в концепцию вашего
            события. От сложных скульптурных форм до минималистичного декора —
            мы воплотим в жизнь любые ваши идеи и референсы.
          </span>
          <span>
            Каждый десерт — это ручная работа, премиальные ингредиенты и
            внимание к деталям. Доверьте нам главный акцент вашего вечера.
          </span>
        </p>
        <div className="customize-info__btn-wrapper">
          <Button textKey="Связаться" href="/contact" />
        </div>
      </div>
    </section>
  );
}

export default CustomizeInfo;
