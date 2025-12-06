import React from "react";
import Image from "next/image";
import { useMutation } from "@apollo/client/react";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import {
  CartItem as CartItemType,
  OrderDirection,
} from "@/types/__generated__/graphql";
import {
  INCREASE_CART_ITEM,
  DECREASE_CART_ITEM,
  DELETE_CART_ITEM,
} from "../operations";
import { cartVar } from "@/lib/cache";
import "./cart-item.scss";

type CartItemProps = {
  cartItem: CartItemType;
};

function CartItem({ cartItem }: CartItemProps) {
  const operationVariable = {
    cartItemId: cartItem.id,
    cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
    orderImagesBy: [{ createdAt: OrderDirection.Asc }],
    takeImage: 1,
  };

  const [increaseCartItem, { loading: isCartIncreasing }] = useMutation(
    INCREASE_CART_ITEM,
    {
      variables: operationVariable,
      onCompleted(data) {
        cartVar(data.increaseCartItem);
      },
    }
  );
  const [decreaseCartItem, { loading: isCartDecreaasing }] = useMutation(
    DECREASE_CART_ITEM,
    {
      variables: operationVariable,
      onCompleted(data) {
        cartVar(data.decreaseCartItem);
      },
    }
  );
  const [deleteCartItem, { loading: isCartItemDeleting }] = useMutation(
    DELETE_CART_ITEM,
    {
      variables: operationVariable,
      onCompleted(data) {
        cartVar(data.removeFromCart);
      },
    }
  );

  const loading = isCartDecreaasing || isCartIncreasing || isCartItemDeleting;

  return (
    <div className={["cart-item", loading ? "in-flight" : ""].join(" ")}>
      <button
        className="cart-item__remove-item-btn"
        disabled={loading}
        onClick={() => deleteCartItem()}
      >
        <CloseIcon />
      </button>
      <div className="cart-item__product-image-container">
        <Image
          src={cartItem.product?.images![0].image?.url ?? ""}
          alt="Image of a cart item product"
          fill
          className="cart-item__product-image"
        />
      </div>
      <div className="cart-item__info">
        <h4 className="cart-item__product-name">{cartItem.product?.name}</h4>
        <div className="cart-item__details">
          <span className="cart-item__details-metric">1000 г</span>
          <span className="cart-item__details-shape">Круг</span>
        </div>
        <div className="cart-item__btn-wrapper">
          <button
            className="cart-item__btn"
            disabled={loading}
            onClick={() => decreaseCartItem()}
          >
            <MinusIcon />
          </button>
          <span className="cart-item__qty">{cartItem.quantity}</span>
          <button
            className="cart-item__btn"
            disabled={loading}
            onClick={() => increaseCartItem()}
          >
            <PlusIcon />
          </button>
        </div>
        <h5 className="cart-item__sub-total">{cartItem.subTotal} ₽</h5>
      </div>
    </div>
  );
}
export default CartItem;
