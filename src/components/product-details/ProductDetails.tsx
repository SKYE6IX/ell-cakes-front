"use client";
import React from "react";
import { useReadQuery, QueryRef } from "@apollo/client/react";
import ProductImageGallery from "./product-gallery/ProductImageGallery";
import ProductInfoPanel from "./product-info-panel/ProductInfoPanel";
import { Product } from "@/types/__generated__/graphql";
import "./product-details.scss";

function ProductDetails({
  queryRef,
}: {
  productSlug: string;
  queryRef: QueryRef<{ product: Product }>;
}) {
  const { data, error } = useReadQuery(queryRef);
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
