import React from "react";
import "./product-details-sekeleton.scss";

function ProductDetailsSkeleton() {
  return (
    <div className="product-details-skeleton">
      <div className="product-details-skeleton__image"></div>
      <ul className="product-details-skeleton__info-list">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="product-details-skeleton__info-item"></li>
        ))}
      </ul>
    </div>
  );
}

export default ProductDetailsSkeleton;
