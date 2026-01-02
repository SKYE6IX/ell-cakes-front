"use client";
import { useRef, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import ProductImageGallery from "./product-gallery/ProductImageGallery";
import ProductInfoPanel from "./product-info-panel/ProductInfoPanel";
import { OrderDirection } from "@/types/__generated__/graphql";
import {
  GET_PRODUCT_DETAILS_QUERY,
  QUERY_SIMILAR_PRODUCTS,
} from "./operations";
import ProductDetailsSkeleton from "./skeleton/ProductDetailsSkeleton";
import ProductList from "../product-list/ProductList";
import ProductListSkeleton from "../product-list/ProductListSkeleton";
import "./product-details.scss";

function ProductDetails({ productSlug }: { productSlug: string }) {
  const similarProductsContainerRef = useRef<HTMLDivElement>(null);
  const { data, error, loading } = useQuery(GET_PRODUCT_DETAILS_QUERY, {
    variables: {
      where: { slug: productSlug },
      imagesOrderBy: [{ id: OrderDirection.Asc }],
      variantsOrderBy: [{ price: OrderDirection.Asc }],
      toppingOptionOrderBy: [
        {
          extraPrice: OrderDirection.Asc,
        },
      ],
    },
  });

  const [
    getSimilarProducts,
    { data: similarProducts, loading: isSimilarProductLoading },
  ] = useLazyQuery(QUERY_SIMILAR_PRODUCTS);

  useEffect(() => {
    const containerToObserve = similarProductsContainerRef.current;
    if (!containerToObserve) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (data) {
            getSimilarProducts({
              variables: {
                productId: data.product.id,
                variantType: data.product.variantType!,
                takeFillings: 1,
                takeVariants: 1,
                orderVariantsBy: [{ price: OrderDirection.Asc }],
                imagesOrderBy: [{ id: OrderDirection.Asc }],
              },
            });
          }
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
  }, [data, getSimilarProducts, loading]);

  if (loading) return <ProductDetailsSkeleton />;

  if (error) return <p>An error occur: - {error.message}</p>;

  if (!data) return null;

  return (
    <div className="product-details">
      <div className="product-details__product-wrapper">
        <section className="product-details__gallery-section">
          <ProductImageGallery productImages={data.product.images!} />
        </section>
        <section className="product-details__product-info-section">
          <ProductInfoPanel product={data.product} />
        </section>
      </div>

      <div
        className="product-details__similar-products"
        ref={similarProductsContainerRef}
      >
        <h3 className="similar-products__heading">
          Сделай праздник ещё вкуснее
        </h3>
        <div className="similar-products__container">
          {isSimilarProductLoading && <ProductListSkeleton />}
          {similarProducts && (
            <ProductList products={similarProducts.querySimilarProducts} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
