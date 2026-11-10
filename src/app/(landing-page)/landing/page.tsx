import type { Metadata } from "next";
import Image from "next/image";
import ServingTimer from "./serving-timer/ServingTimer";
import ReviewQr from "./review-qr/ReviewQr";
import "./landing.scss";

export const metadata: Metadata = {
  title: "Ваш торт Ell Cakes",
};

const temperatureTicks = ["0", "+2", "+4", "+6", "+8", "+10 °C"];

function LandingPage() {
  return (
    <div className="care-card">
      <div className="care-card__logo">
        <Image
          src="/landing-images/logo-green.png"
          alt="Ell Cakes"
          width={126}
          height={24}
          className="care-card__logo-image"
          priority
        />
      </div>

      <div className="care-card__hero">
        <span className="care-card__label">Ваш торт уже у вас</span>
        <h1 className="care-card__title">
          Пусть он запомнится таким же вкусным
        </h1>
        <p className="care-card__hero-text">
          Пара простых советов, чтобы торт был таким, каким мы его задумали.
        </p>
      </div>

      <section className="care-card__section" aria-labelledby="h-store">
        <span className="care-card__label">Условия хранения</span>
        <h2 className="care-card__heading" id="h-store">
          Храните в холодильнике
        </h2>
        <div className="care-card__temp">
          <b className="care-card__temp-value">+2…+6 °C</b>
          <span className="care-card__temp-text">температура хранения</span>
        </div>
        <div className="care-card__scale" aria-hidden="true">
          <div className="care-card__bar">
            <i className="care-card__bar-range" />
          </div>
          <div className="care-card__ticks">
            {temperatureTicks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>
        </div>
        <div className="care-card__facts">
          <div className="care-card__fact">
            <b className="care-card__fact-value">72 часа</b>
            <span className="care-card__fact-text">срок годности торта</span>
          </div>
          <div className="care-card__fact">
            <b className="care-card__fact-value">24 часа</b>
            <span className="care-card__fact-text">
              свежесть ягод в украшении
            </span>
          </div>
        </div>
      </section>

      <section
        className="care-card__section care-card__section--secret"
        aria-labelledby="h-secret"
      >
        <span className="care-card__label">
          Маленький секрет идеальной подачи
        </span>
        <h2 className="care-card__heading" id="h-secret">
          15–30 минут при комнатной температуре
        </h2>
        <p className="care-card__secret-text">
          Дайте торту постоять 15–30 минут перед подачей — так его текстура
          станет нежнее, а вкус раскроется во всей полноте.
        </p>
        <ServingTimer />
      </section>

      <section
        className="care-card__section care-card__section--review"
        aria-labelledby="h-review"
      >
        <span className="care-card__label">Будем рады отзыву</span>
        <h2 className="care-card__heading" id="h-review">
          Понравился торт? Расскажите об этом
        </h2>
        <p className="care-card__review-text">
          Ваш отзыв на Яндекс Картах помогает другим выбрать торт к своему
          празднику — и очень радует нашу команду.
        </p>
        <a
          className="care-card__cta"
          href="https://ya.cc/t/Vxht4M46BRUvU4"
          target="_blank"
          rel="noopener"
        >
          Оставить отзыв
        </a>
        <div className="care-card__qr">
          <ReviewQr className="care-card__qr-image" />
          <small className="care-card__qr-text">
            или отсканируйте с другого телефона
          </small>
        </div>
      </section>

      <footer className="care-card__footer">
        <em className="care-card__slogan">Торт, который запомнится</em>
        <div className="care-card__links">
          <a
            className="care-card__link"
            href="https://t.me/by_ellcakes"
            target="_blank"
            rel="noopener"
          >
            Telegram
          </a>
          <a
            className="care-card__link"
            href="https://www.instagram.com/ell_cakes"
            target="_blank"
            rel="noopener"
          >
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
