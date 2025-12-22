"use client";
import { useReadQuery, QueryRef } from "@apollo/client/react";
import { FeaturedProduct } from "@/types/__generated__/graphql";
import ProductList from "@/components/product-list/ProductList";
import "./feature-section.scss";

function FeaturedSection({
  queryRef,
}: {
  queryRef: QueryRef<{ featuredProducts: FeaturedProduct[] }>;
}) {
  const { data } = useReadQuery(queryRef);
  const products = data.featuredProducts[0].products;
  return (
    <section className="featured-section">
      <h3 className="featured__title">
        ВСЕ, ЧТО НУЖНО ДЛЯ УДОВЛЕТВОРЕНИЯ САМОГО ИЗЫСКАННОГО ВКУСА
      </h3>
      <h5 className="featured__sub-title">
        МЫ ПРЕДЛАГАЕМ ТОЛЬКО СВЕЖИЕ ИНГРЕДИЕНТЫ И САМЫЕ ЛУЧШИЕ РЕЦЕПТЫ!
      </h5>
      <div className="featured__products-wrapper">
        {products && products.length > 1 && <ProductList products={products} />}
      </div>
    </section>
  );
}

export default FeaturedSection;
