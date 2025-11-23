import React from "react";
import ArrowDown from "@/components/icons/ArrowDown";
import "./product-info-btn.scss";

type ProductInfoBtnProps = {
  buttonText: string;
  handleOnClick: () => void;
};

function ProductInfoBtn({ buttonText, handleOnClick }: ProductInfoBtnProps) {
  return (
    <button className="product-info-btn" onClick={handleOnClick}>
      <span className="product-info-btn__text">{buttonText}</span>
      <span className="product-info-btn__icon">
        <ArrowDown />
      </span>
    </button>
  );
}

export default ProductInfoBtn;
