import React from "react";
import CartIcon from "@/components/icons/CartIcon";
import { isCartOpenVar } from "@/lib/cache";
import "./cart-menu-btn.scss";

function CartMenuBtn() {
  const openCart = () => {
    isCartOpenVar(true);
  };
  return (
    <button className="cart-menu" onClick={openCart}>
      <CartIcon />
    </button>
  );
}

export default CartMenuBtn;
