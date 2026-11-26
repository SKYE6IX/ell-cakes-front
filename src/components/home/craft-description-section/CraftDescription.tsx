import Image from "next/image";
import Button from "@/components/button/Button";
import craftImage from "./craft-section-image.jpg";
import "./craft-description.scss";

function CraftDescription() {
  return (
    <section className="craft-description">
      <div className="craft-description__text-wrapper">
        <h3 className="craft-description__heading">
          Авторские торты, пирожные и нежнейшие капкейки{" "}
          <span className="highlight">ручной работы</span>
        </h3>
        <p
          className="craft-description__text"
          data-testid="craft-description-text"
        >
          В основе наших десертов — только натуральные ингредиенты
          премиум-класса. Мы убеждены, что идеальный вкус не нуждается в
          красителях и консервантах, поэтому каждый торт — это чистое
          удовольствие и ручная работа.
        </p>
        <div className="craft-description__btn-wrapper">
          <Button textKey="Смотреть ассортимент" href="/collections" />
        </div>
      </div>
      <div className="craft-description__image-container">
        <Image
          src={craftImage}
          alt="An image shown to describe how we work"
          fill
          className="craft-description__image"
        />
      </div>
    </section>
  );
}

export default CraftDescription;
