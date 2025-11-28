"use client";
import React from "react";
import { useQuery } from "@apollo/client/react";
import ProductImageGallery from "./product-gallery/ProductImageGallery";
import ProductInfoPanel from "./product-info-panel/ProductInfoPanel";
import { OrderDirection } from "@/types/__generated__/graphql";
import { GET_PRODUCT_DETAILS_QUERY } from "./operations";
import ProductDetailsSkeleton from "./skeleton/ProductDetailsSkeleton";
import "./product-details.scss";

function ProductDetails({ productSlug }: { productSlug: string }) {
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS_QUERY, {
    variables: {
      where: { slug: productSlug },
      variantsOrderBy: [
        { weight: OrderDirection.Asc },
        { pieces: OrderDirection.Asc },
      ],
      toppingOptionOrderBy: [
        {
          weight: OrderDirection.Asc,
        },
      ],
    },
  });
  if (loading) return <ProductDetailsSkeleton />;
  if (error) return <p>An error occur: - {error.message}</p>;
  if (!data) return null;

  return (
    <div className="product-details">
      <section className="product-details__gallery-section">
        <ProductImageGallery productImages={data.product.images!} />
      </section>
      <section className="product-details__product-info-section">
        <ProductInfoPanel product={data.product} />
      </section>
    </div>
  );
}

export default ProductDetails;
