import Image from "next/image";
import type { Filling } from "../fillingsList";
import "./filling-card.scss";

type FillingCardProps = {
  filling: Filling;
};

function FillingCard({ filling }: FillingCardProps) {
  return (
    <article className="filling-card">
      <div className="filling-card__media">
        <Image
          src={filling.image}
          alt={`Начинка «${filling.name}» в разрезе`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="filling-card__image"
        />
      </div>

      <div className="filling-card__content">
        <h3 className="filling-card__name">{filling.name}</h3>

        <div className="filling-card__prices">
          <p className="filling-card__price">
            минимальный вес {filling.minWeight} - {filling.minWeightPrice}
          </p>
          <p className="filling-card__price">1 кг - {filling.pricePerKg}</p>
        </div>

        <ul className="filling-card__description">
          {filling.description.map((item) => (
            <li key={item} className="filling-card__description-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default FillingCard;
