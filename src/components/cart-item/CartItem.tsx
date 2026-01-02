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
} from "../cart/operations";
import { GET_CART_QUERY } from "../cart/operations";
import { useWriteCartQuery } from "@/hooks/useWriteCartQuery";
import "./cart-item.scss";

type CartItemProps = {
  cartItem: CartItemType;
  mode: "read-only" | "read-write";
};

function CartItem({ cartItem, mode }: CartItemProps) {
  const writeCartQuery = useWriteCartQuery();
  const operationVariable = {
    cartItemId: cartItem.id,
    cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
    orderImagesBy: [{ id: OrderDirection.Asc }],
  };

  const [increaseCartItem, { loading: isCartIncreasing }] = useMutation(
    INCREASE_CART_ITEM,
    {
      variables: operationVariable,
      update(cache, { data }) {
        if (data?.increaseCartItem) {
          writeCartQuery(cache, data.increaseCartItem);
        }
      },
    }
  );

  const [decreaseCartItem, { loading: isCartDecreaasing }] = useMutation(
    DECREASE_CART_ITEM,
    {
      variables: operationVariable,
      update(cache, { data }) {
        if (data?.decreaseCartItem) {
          writeCartQuery(cache, data.decreaseCartItem);
        }
      },
      refetchQueries(result) {
        if (result.data.decreaseCartItem === null) {
          return [GET_CART_QUERY];
        }
        return [];
      },
    }
  );

  const [deleteCartItem, { loading: isCartItemDeleting }] = useMutation(
    DELETE_CART_ITEM,
    {
      variables: operationVariable,
      update(cache, { data }) {
        if (data?.removeFromCart) {
          writeCartQuery(cache, data.removeFromCart);
        }
      },
      refetchQueries(result) {
        if (result.data.removeFromCart === null) {
          return [GET_CART_QUERY];
        }
        return [];
      },
    }
  );

  const loading = isCartDecreaasing || isCartIncreasing || isCartItemDeleting;

  return (
    <div className={["cart-item", loading ? "in-flight" : ""].join(" ")}>
      <button
        className={`cart-item__remove-item-btn ${
          mode === "read-only" ? "hide" : ""
        }`}
        disabled={loading}
        onClick={() => deleteCartItem()}
      >
        <CloseIcon />
      </button>
      <div className="cart-item__product-image-container">
        <Image
          src={cartItem.product?.images![0].image?.url ?? ""}
          alt={cartItem.product?.name || "Product Image"}
          fill
          className="cart-item__product-image"
          loading="lazy"
        />
      </div>
      <div className="cart-item__info">
        <h4 className="cart-item__product-name">{cartItem.product?.name}</h4>
        <div className="cart-item__details">
          <span className="cart-item__details-metric">
            {`${cartItem.variant?.weight}`} г
          </span>
          {/* <span className="cart-item__details-shape">Круг</span> */}
        </div>
        <div
          className={`cart-item__btn-wrapper ${
            mode === "read-only" ? "hide" : ""
          }`}
        >
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
