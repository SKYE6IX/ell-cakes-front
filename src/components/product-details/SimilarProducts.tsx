"use client";
import { useRef, useEffect } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { QUERY_SIMILAR_PRODUCTS } from "./operations";
import ProductList from "../product-list/ProductList";
import ProductListSkeleton from "../product-list/ProductListSkeleton";
import { OrderDirection } from "@/types/__generated__/graphql";
import "./product-details.scss";

interface SimilarProductsProps {
  productSlug: string;
}

function SimilarProducts({ productSlug }: SimilarProductsProps) {
  const similarProductsContainerRef = useRef<HTMLDivElement>(null);
  const [getSimilarProducts, { data, loading }] = useLazyQuery(
    QUERY_SIMILAR_PRODUCTS
  );
  const similarProducts = data?.querySimilarProducts;

  useEffect(() => {
    const containerToObserve = similarProductsContainerRef.current;

    if (!containerToObserve) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          getSimilarProducts({
            variables: {
              productSlug,
              takeFillings: 1,
              takeVariants: 1,
              orderVariantsBy: [{ price: OrderDirection.Asc }],
              imagesOrderBy: [{ id: OrderDirection.Asc }],
            },
          });
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );
    observer.observe(containerToObserve);
    return () => observer.disconnect();
  }, [data, getSimilarProducts, productSlug]);

  return (
    <div
      className="product-details__similar-products"
      ref={similarProductsContainerRef}
    >
      <h3 className="similar-products__heading">Сделай праздник ещё вкуснее</h3>
      <div className="similar-products__container">
        {loading && <ProductListSkeleton />}
        {similarProducts && <ProductList products={similarProducts} />}
      </div>
    </div>
  );
}

export default SimilarProducts;
