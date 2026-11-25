import RefrigeratedTruckIcon from "@/components/icons/RefrigeratedTruckIcon";
import ShieldStarIcon from "@/components/icons/ShieldStarIcon";
import TieredCakeIcon from "@/components/icons/TieredCakeIcon";
import "./why-us.scss";

function WhyUs() {
  return (
    <section className="why-us">
      <h3 className="why-us__heading">Почему выбирают нас?</h3>
      <ul className="why-us__lists">
        <li className="why-us__item">
          <RefrigeratedTruckIcon />
          <h5 className="why-us__item-heading">Бережная доставка</h5>
          <p className="why-us__item-text" data-testid="why-us-item-text">
            Привозим торты в специальных автомобилях с холодильными
            установками. Доставим по Москве и области точно к назначенному
            времени, чтобы десерт приехал идеально свежим.
          </p>
        </li>

        <li className="why-us__item">
          <ShieldStarIcon />
          <h5 className="why-us__item-heading">Нам доверяют важные события</h5>
          <p className="why-us__item-text" data-testid="why-us-item-text">
            Наши торты выбирают для закрытых вечеринок, свадеб и съемок. Мы
            умеем работать с высокими требованиями и сохранять
            конфиденциальность.
          </p>
        </li>

        <li className="why-us__item">
          <TieredCakeIcon />
          <h5 className="why-us__item-heading">
            Более 20 000 счастливых моментов
          </h5>
          <p className="why-us__item-text" data-testid="why-us-item-text">
            За 10 лет мы испекли тысячи тортов. Наш опыт позволяет нам не
            бояться сложных заказов и гарантировать безупречный вкус в каждой
            коробке.
          </p>
        </li>
      </ul>
    </section>
  );
}

export default WhyUs;
