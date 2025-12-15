import React from "react";
import NotFoundFolderIcon from "../icons/NotFoundFolderIcon";
import "./product-not-found.scss";

function ProductNotFound() {
  return (
    <div className="product-not-found">
      <NotFoundFolderIcon />
      <h3 className="product-not-found__title">Не удалось загрузить товары</h3>
      <p className="product-not-found__text">
        Возможно, данные временно недоступны. Попробуйте вернуться позже
      </p>
    </div>
  );
}

export default ProductNotFound;
