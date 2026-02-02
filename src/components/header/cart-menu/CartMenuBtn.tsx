"use client";
import { useQuery } from "@apollo/client/react";
import CartIcon from "@/components/icons/CartIcon";
import { isCartOpenVar } from "@/lib/cache";
import { GET_CART_QUERY } from "@/components/cart/operations";
import { OrderDirection } from "@/types/__generated__/graphql";
import "./cart-menu-btn.scss";

function CartMenuBtn() {
  const { data, refetch } = useQuery(GET_CART_QUERY, {
    variables: {
      cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
      orderImagesBy: [{ createdAt: OrderDirection.Asc }],
    },
  });

  const cart = data?.queryCart;

  const openCart = () => {
    refetch();
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
