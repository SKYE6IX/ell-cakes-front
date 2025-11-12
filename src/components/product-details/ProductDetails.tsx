import React from "react";
import ProductImageGallery from "./product-gallery/ProductImageGallery";
import ProductInfoPanel from "./product-info-panel/ProductInfoPanel";
import "./product-details.scss";

function ProductDetails() {
  return (
    <div className="product-details">
      <ProductImageGallery />
      <ProductInfoPanel />
    </div>
  );
}

export default ProductDetails;
