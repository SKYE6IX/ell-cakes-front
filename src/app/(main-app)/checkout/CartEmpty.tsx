import Link from "next/link";
import "./checkout.scss";

function CartEmpty() {
  return (
    <section className="cart-empty">
      <h4 className="cart-empty__heading">
        Ваша корзина пуста, начните покупки прямо сейчас!
      </h4>
      <Link href="/collections" className="cart-empty__link">
        Заказ!
      </Link>
    </section>
  );
}

export default CartEmpty;
