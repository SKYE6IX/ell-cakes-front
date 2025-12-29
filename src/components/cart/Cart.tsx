"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useReactiveVar, useQuery } from "@apollo/client/react";
import Modal from "../modal/Modal";
import CartItem from "../cart-item/CartItem";
import { isCartOpenVar, cartVar } from "@/lib/cache";
import { GET_CART_QUERY } from "./operations";
import { OrderDirection } from "@/types/__generated__/graphql";
import "./cart.scss";

function Cart() {
  const cart = useReactiveVar(cartVar);
  const isCartOpen = useReactiveVar(isCartOpenVar);

  const { data } = useQuery(GET_CART_QUERY, {
    variables: {
      cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
      orderImagesBy: [{ createdAt: OrderDirection.Asc }],
    },
  });

  const cartResult = data?.queryCart ?? null;

  useEffect(() => {
    cartVar(cartResult);
  }, [cartResult]);

  const handleCloseModal = () => {
    isCartOpenVar(false);
  };

  return (
    <Modal
      headingText="Ваш заказ"
      showModal={isCartOpen}
      handleCloseModal={handleCloseModal}
    >
      <div className="cart full-height">
        {!cart ? (
          <div className="cart__empty-cart">
            <h4 className="cart__empty-cart-text">
              Ваша корзина пуста, начните покупки прямо сейчас!
            </h4>
            <Link
              href="/collections"
              className="cart__empty-cart-link"
              onClick={handleCloseModal}
            >
              Заказ!
            </Link>
          </div>
        ) : (
          <>
            <div className="cart_cart-item-list">
              {cart?.cartItems!.map((cartItem) => (
                <CartItem
                  key={cartItem.id}
                  cartItem={cartItem}
                  mode="read-write"
                />
              ))}
            </div>
            <div className="cart__checkout-btn-wrapper">
              <Link
                href="/checkout"
                className="cart__checkout-btn"
                onClick={handleCloseModal}
              >
                оформить заказ {cart?.subTotal}₽
              </Link>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default Cart;
