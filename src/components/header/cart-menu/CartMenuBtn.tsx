import React from "react";
import CartIcon from "@/components/icons/CartIcon";
import "./cart-menu-btn.scss";

function CartMenuBtn() {
  return (
    <button className="cart-menu">
      <CartIcon />
    </button>
  );
}

export default CartMenuBtn;
