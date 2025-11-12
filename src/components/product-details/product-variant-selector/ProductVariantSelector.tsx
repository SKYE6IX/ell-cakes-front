import React from "react";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import "./product-variant-selector.scss";

function ProductVariantSelector() {
  return (
    <div className="product-variant-selector">
      <button className="product-variant-selector__button">
        <MinusIcon />
      </button>
      <div className="product-variant-selector__details">
        <span className="product-variant-selector__metric">4 кг</span>
        <span className="product-variant-selector__price">1800 ₽</span>
      </div>
      <button className="product-variant-selector__button">
        <PlusIcon />
      </button>
    </div>
  );
}

export default ProductVariantSelector;
