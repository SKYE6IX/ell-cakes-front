import Link from "next/link";
import FillingCard from "./filling-card/FillingCard";
import "./fillings.scss";
import { fillingsList } from "./fillingsList";

function Fillings() {
  return (
    <section className="fillings">
      <div className="fillings__intro">
        <h2 className="fillings__title">Начинки</h2>
        <p className="fillings__text">
          Здесь собраны все наши начинки: что внутри каждой, минимальный вес и стоимость.
          Понравившуюся начинку можно заказать в разделе «Ягодные торты» — выберите торт и
          укажите нужную начинку при оформлении заказа.
        </p>
        <Link
          href="/collections/yagodnye-torty"
          className="fillings__action fillings__action--dark"
        >
          Перейти к ягодным тортам
        </Link>
      </div>

      <div className="fillings__list">
        {fillingsList.map((filling) => (
          <FillingCard key={filling.key} filling={filling} />
        ))}
      </div>

      <div className="fillings__notice">
        <div className="fillings__notice-text-wrapper">
          <h3 className="fillings__notice-title">Остались вопросы о начинках?</h3>
          <p className="fillings__notice-text">
            Если у вас или ваших гостей есть аллергия или ограничения в питании, свяжитесь с нашим
            менеджером - мы подробно расскажем о составе и поможем с выбором.
          </p>
        </div>
        <div className="fillings__notice-actions">
          <Link
            href="/collections/yagodnye-torty"
            className="fillings__action fillings__action--primary"
          >
            Выбрать торт
          </Link>
          <Link href="/contact" className="fillings__action fillings__action--outline">
            Связаться
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Fillings;
