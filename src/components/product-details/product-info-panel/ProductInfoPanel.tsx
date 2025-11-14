"use client";
import React from "react";
import ProductFillingSelector from "../product-filling-selector/ProductFillingSelector";
import ProductVariantSelector from "../product-variant-selector/ProductVariantSelector";
import ProductShape from "../product-customisations/ProductShape";
import AddCustomisePhoto from "../product-customisations/AddCustomisePhoto";
import AddCustomiseInscription from "../product-customisations/AddCustomiseInscription";
import AddTopping from "../product-customisations/AddTopping";
import StorageInfo from "../storage-info/StorageInfo";
import IngredientsInfo from "../ingredients-info/IngredientsInfo";
import ProductReviews from "../product-reviews/ProductReviews";
import ProductFAQ from "../product-faq/ProductFAQ";
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
      <div className="product-info-panel__customisations-wrapper">
        <ProductShape />
        <AddCustomisePhoto />
        <AddCustomiseInscription />
        <AddTopping />
      </div>
      <button className="product-info-panel__add-to-cart">
        <span className="product-info-panel__add-to-cart-text">
          Добавить в корзину
        </span>
        <span className="product-info-panel__unit-price">3200 ₽ </span>
      </button>
      <StorageInfo />
      <IngredientsInfo />
      <div className="product-info-panel__promotion-section">
        <h5 className="product-info-panel__promotion-text1">
          Первая покупка — еще вкуснее 
        </h5>
        <h5 className="product-info-panel__promotion-text2">с 15% скидкой!</h5>
      </div>
      <ProductReviews />
      <ProductFAQ />
    </div>
  );
}

export default ProductInfoPanel;
