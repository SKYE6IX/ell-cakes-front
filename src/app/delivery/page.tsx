import Image from "next/image";
import dessertImage from "./dessert.jpeg";
import "./delivery.scss";

function Delivery() {
  return (
    <section className="delivery">
      <div className="delivery__text-wrapper">
        <h2 className="delivery__title">Доставка</h2>
        <p className="delivery__text" data-testid="page-text">
          Когда вы заказываете десерт в Ell cakes, вы получаете не просто сладость - вы получаете маленькое чудо, которое приедет к вам в целости и сохранности.
        </p>
        <p className="delivery__text" data-testid="page-text">
          Мы бережно упаковываем каждый торт и доставляем его в специально оборудованной машине с холодильной установкой, чтобы десерт дошёл до вас таким же свежим, как будто только из наших рук.
        </p>
        <p className="delivery__text" data-testid="page-text">
          График доставки - Ежедневно с 9:00 до 21:00
        </p>
        <p className="delivery__text" data-testid="page-text">
          Стоимость доставки:<br/>
          - В пределах МКАД с 10 до 16 ч - 990 ₽<br/>
          - За МКАД - 990 ₽ + 50 ₽/км (расчёт по Яндекс.Картам)
        </p>
        <p className="delivery__text" data-testid="page-text">
          Интервалы доставки:<br/>
          - Доставка в 2-часовом интервале - 1290 ₽<br/>
          - Доставка ко времени - 1590 ₽
        </p>
        <p className="delivery__text" data-testid="page-text">
          Дополнительные условия:<br/>
          - Ожидание курьера свыше 15 минут - 15 ₽ / минута<br/>
          - Заказы от 6 коробок - доплата 300 ₽<br/>
          - Торты от 8 кг - доплата 400 ₽<br/>
          - Торты от 15 кг - доплата 1000 ₽<br/>
        </p>
        <p className="delivery__text" data-testid="page-text">
          Обращаем внимание что, после передачи заказа курьером ответственность за дальнейшую сохранность изделия переходит к получателю.
        </p>
      </div>
      <div className="delivery__media">
        <Image
          className="delivery__image"
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
export default Delivery;
