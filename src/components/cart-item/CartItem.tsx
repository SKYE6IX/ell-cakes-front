import Link from "next/link";
import { useMutation } from "@apollo/client/react";
import { useReactiveVar } from "@apollo/client/react";
import CustomImage from "../custom-image/CustomImage";
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
import { isCartOpenVar } from "@/lib/cache";
import "./cart-item.scss";

type CartItemProps = {
  cartItem: CartItemType;
  mode: "read-only" | "read-write";
};

type CustomizationOption = {
  name: "PHOTOS" | "INSCRIPTION" | "CANDLE";
  customValue: {
    value: string;
  };
};

function CartItem({ cartItem, mode }: CartItemProps) {
  const isCartOpen = useReactiveVar(isCartOpenVar);
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

  const getCustomizationIcon = (optionName: CustomizationOption["name"]) => {
    switch (optionName) {
      case "PHOTOS":
        return "📷";
      case "CANDLE":
        return "🎂";
      case "INSCRIPTION":
        return "✍️";
      default:
        return "";
    }
  };

  const handleCloseModal = () => {
    isCartOpenVar(false);
  };

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

      <Link
        href={`/product/${cartItem.product?.slug}`}
        onClick={handleCloseModal}
      >
        <div className="cart-item__product-image-container">
          <CustomImage
            src={cartItem.product?.images![0].image?.url ?? ""}
            alt={cartItem.product?.name || "Product Image"}
            fill
            className="cart-item__product-image"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="cart-item__info">
        <h4 className="cart-item__product-name">{cartItem.product?.name}</h4>

        <div className="cart-item__details">
          {cartItem.product?.variantType === "weight" && (
            <span className="cart-item__details-metric">
              {`${cartItem.variant?.weight}`} кг
            </span>
          )}
          {cartItem.product?.variantType === "pieces" && (
            <span className="cart-item__details-metric">
              {`${cartItem.variant?.pieces}`} шт
            </span>
          )}
          {cartItem.product?.variantType === "size" && (
            <span className="cart-item__details-metric">
              {`${cartItem.variant?.size}`} см
            </span>
          )}

          {/* Customizations */}
          {(cartItem.customizations as CustomizationOption[])?.map(
            (customize) => (
              <span
                key={customize.name.toLowerCase()}
                className="cart-item__details-customization"
              >
                {`${getCustomizationIcon(customize.name)} 
                ${
                  customize.name !== "INSCRIPTION"
                    ? customize.customValue?.value
                    : ""
                }`}
              </span>
            )
          )}
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
