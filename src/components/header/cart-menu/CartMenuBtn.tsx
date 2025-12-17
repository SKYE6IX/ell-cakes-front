"use client";
import React from "react";
import { useReactiveVar } from "@apollo/client/react";
import CartIcon from "@/components/icons/CartIcon";
import { isCartOpenVar, cartVar } from "@/lib/cache";
import "./cart-menu-btn.scss";

function CartMenuBtn() {
  const cart = useReactiveVar(cartVar);
  const openCart = () => {
    isCartOpenVar(true);
  };
  return (
    <button className="cart-menu" onClick={openCart}>
      <CartIcon />
      {cart && <div className="cart-menu__notification" />}
    </button>
  );
}

export default CartMenuBtn;
