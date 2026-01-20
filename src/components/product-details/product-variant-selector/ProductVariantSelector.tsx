import { useState, useEffect, Dispatch } from "react";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import { ProductVariant } from "@/types/__generated__/graphql";
import type { ACTIONTYPE } from "../product-info-panel/productConfigurationReducer";
import "./product-variant-selector.scss";

type ProductVariantSelectorProps = {
  variants: ProductVariant[];
  variantType: string;
  dispatch: Dispatch<ACTIONTYPE>;
};

function ProductVariantSelector({
  variants,
  variantType,
  dispatch,
}: ProductVariantSelectorProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const selectedVariant = variants[currentIdx];

  // Reset back to the lowest variants when user change their selected filling
  useEffect(() => {
    setCurrentIdx(0);
  }, [variants]);

  useEffect(() => {
    dispatch({
      type: "set_selected_product_variant",
      payload: selectedVariant,
    });
  }, [currentIdx, selectedVariant, dispatch]);

  const changeVariant = (changeType: "increase" | "decrease") => {
    if (changeType === "increase") {
      setCurrentIdx((prvIdx) => {
        if (prvIdx >= variants.length - 1) {
          return prvIdx;
        }
        return prvIdx + 1;
      });
    }
    if (changeType === "decrease") {
      setCurrentIdx((prvIdx) => {
        if (prvIdx <= 0) {
          return prvIdx;
        }
        return prvIdx - 1;
      });
    }
  };

  const isFirstVariant = currentIdx === 0;
  const isLastVariant = currentIdx === variants.length - 1;

  return (
    <div className="product-variant-selector">
      <button
        className={[
          "product-variant-selector__button",
          isFirstVariant ? "disabled" : "",
        ].join(" ")}
        onClick={() => changeVariant("decrease")}
      >
        <MinusIcon />
      </button>
      <div className="product-variant-selector__details">
        {variantType === "weight" && (
          <span
            className="product-variant-selector__metric"
            data-testid="product-variant-weight"
          >
            {selectedVariant.weight as string} кг
          </span>
        )}

        {variantType === "pieces" && (
          <span className="product-variant-selector__metric">
            {selectedVariant.pieces} шт
          </span>
        )}

        {variantType === "size" && (
          <span className="product-variant-selector__metric">
            {selectedVariant.size} см
          </span>
        )}

        <span
          className="product-variant-selector__price"
          data-testid="product-variant-price"
        >
          {selectedVariant.price} ₽
        </span>
      </div>
      <button
        className={[
          "product-variant-selector__button",
          isLastVariant ? "disabled" : "",
        ].join(" ")}
        onClick={() => changeVariant("increase")}
        data-testid="product-variant-increase-btn"
      >
        <PlusIcon />
      </button>
    </div>
  );
}

export default ProductVariantSelector;
