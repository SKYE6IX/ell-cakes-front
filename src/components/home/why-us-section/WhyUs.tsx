import TruckIcon from "@/components/icons/TruckIcon";
import StarsIcon from "@/components/icons/StarsIcon";
import CakeIcon from "@/components/icons/CakeIcon";
import "./why-us.scss";

function WhyUs() {
  return (
    <section className="why-us">
      <h3 className="why-us__heading">ПОЧЕМу выбирают нас ?</h3>
      <ul className="why-us__lists">
        <li className="why-us__item">
          <TruckIcon />
          <h5 className="why-us__item-heading">УДОБНАЯ ДОСТАВКА</h5>
          <p className="why-us__item-text" data-testid="why-us-item-text">
            Доставляем торты по Москве и области в удобное время.
          </p>
        </li>

        <li className="why-us__item">
          <StarsIcon />
          <h5 className="why-us__item-heading">нас выбирают звезды</h5>
          <p className="why-us__item-text" data-testid="why-us-item-text">
            Наши десерты украшают праздники самых известных людей
          </p>
        </li>

        <li className="why-us__item">
          <CakeIcon />
          <h5 className="why-us__item-heading">20 000+ ЗАКАЗОВ</h5>
          <p className="why-us__item-text" data-testid="why-us-item-text">
            Тысячи клиентов уже доверили нам свои праздники.
          </p>
        </li>
      </ul>
    </section>
  );
}

export default WhyUs;
