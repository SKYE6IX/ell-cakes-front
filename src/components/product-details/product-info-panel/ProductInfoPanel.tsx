import React from "react";
import ProductFillingSelector from "../product-filling-selector/ProductFillingSelector";
import ProductVariantSelector from "../product-variant-selector/ProductVariantSelector";
import ProductCustomisation from "../product-customisation/ProductCustomisation";
import "./product-info-panel.scss";

function ProductInfoPanel() {
  return (
    <div className="product-info-panel">
      <div className="product-info-panel__title-wrapper">
        <h3 className="product-info-panel__title">Ягодно-банановый мильфей</h3>
        <span className="product-info-panel__product-metric">4 кг</span>
      </div>
      <p className="product-info-panel__description">
        Яркий, дерзкий и насыщенный вкус создан, чтоб покорять ваши сердца!
        Шоколадный кап, жаренный арахис в соленой карамели, шапочка из
        сливочного крем-чиза и сочные ягоды в украшении. Хит продаж за последние
        несколько лет!
      </p>
      <ProductFillingSelector />
      <ProductVariantSelector />
      <ProductCustomisation />
      <button className="product-info-panel__add-to-cart">
        <span className="product-info-panel__add-to-cart-text">
          Добавить в корзину
        </span>
        <span className="product-info-panel__unit-price">3200 ₽ </span>
      </button>
    </div>
  );
}

export default ProductInfoPanel;
