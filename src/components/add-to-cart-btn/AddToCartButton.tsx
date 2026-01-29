"use client";
import { useMutation } from "@apollo/client/react";
import { isCartOpenVar } from "@/lib/cache";
import CartIcon from "../icons/CartIcon";
import { ADD_TO_CART_MUTATION, AddToCartArgs } from "./operation";
import { OrderDirection } from "@/types/__generated__/graphql";
import { useWriteCartQuery } from "@/hooks/useWriteCartQuery";
import "./add-to-cart-btn.scss";

type AddToCartButtonProps = {
  productPrice: number;
  parentComponent: "product-list" | "product-details";
  addToCartArgs: AddToCartArgs;
};

function AddToCartButton({
  productPrice,
  parentComponent,
  addToCartArgs,
}: AddToCartButtonProps) {
  const writeCartQuery = useWriteCartQuery();

  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      ...addToCartArgs,
      cartItemsOrderBy: [{ createdAt: OrderDirection.Asc }],
      orderImagesBy: [{ id: OrderDirection.Asc }],
    },
    onCompleted(data) {
      if (data.addToCart) {
        isCartOpenVar(true);
      }
    },

    update(cache, { data }) {
      if (data?.addToCart) {
        writeCartQuery(cache, data.addToCart);
      }
    },
  });

  const handleOpenCart = async () => {
    addToCart();
  };

  return (
    <div
      className={`cart-btn ${loading ? "in-flight" : ""}`}
      data-testid="cart-btn-container"
    >
      {parentComponent === "product-list" && (
        <button
          className="cart-btn__product-list"
          onClick={handleOpenCart}
          disabled={loading}
        >
          <span className="cart-btn__product-list-icon">
            <CartIcon />
          </span>
          <span className="cart-btn__product-list-price">{productPrice} ₽</span>
        </button>
      )}

      {parentComponent === "product-details" && (
        <button
          className="cart-btn__product-details"
          onClick={handleOpenCart}
          disabled={loading}
          data-testid="cart-btn-add-cart"
        >
          <span className="cart-btn__product-details-text">
            Добавить в корзину
          </span>
          <span
            className="cart-btn__product-details-price"
            data-testid="cart-btn-product-price"
          >
            {productPrice} ₽
          </span>
        </button>
      )}
    </div>
  );
}

export default AddToCartButton;
