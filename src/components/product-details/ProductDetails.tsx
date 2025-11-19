"use client";
import React from "react";
import { useQuery } from "@apollo/client/react";
import ProductImageGallery from "./product-gallery/ProductImageGallery";
import ProductInfoPanel from "./product-info-panel/ProductInfoPanel";
import { OrderDirection } from "@/types/__generated__/graphql";
import { GET_PRODUCT_DETAILS_QUERY } from "./operations";
import "./product-details.scss";

// yagodno-bananovy-milfey
// tort-lego
// pryamougolny-italyansky-pirog-s-klubnikoy

function ProductDetails() {
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS_QUERY, {
    variables: {
      where: { slug: "tort-lego" },
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
  if (loading) return <p>Loading.....</p>;
  if (error) return <p>An error occur: - {error.message}</p>;
  if (!data) return null;
  return (
    <div className="product-details">
      <ProductImageGallery />
      <ProductInfoPanel product={data.product} />
    </div>
  );
}

export default ProductDetails;
