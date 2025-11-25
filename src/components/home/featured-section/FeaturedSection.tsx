import React from "react";
import ProductList from "@/components/product-list/ProductList";
import "./feature-section.scss";

function FeaturedSection() {
  return (
    <section className="featured-section">
      <h3 className="featured__title">
        ВСЕ, ЧТО НУЖНО ДЛЯ УДОВЛЕТВОРЕНИЯ САМОГО ИЗЫСКАННОГО ВКУСА
      </h3>
      <h5 className="featured__sub-title">
        МЫ ПРЕДЛАГАЕМ ТОЛЬКО СВЕЖИЕ ИНГРЕДИЕНТЫ И САМЫЕ ЛУЧШИЕ РЕЦЕПТЫ!
      </h5>
      <div className="featured__products-wrapper">
        <ProductList />
      </div>
    </section>
  );
}

export default FeaturedSection;
