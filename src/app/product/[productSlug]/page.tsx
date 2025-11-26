import React from "react";
import ProductDetails from "@/components/product-details/ProductDetails";

async function page({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;
  return (
    <div>
      <ProductDetails productSlug={productSlug} />
    </div>
  );
}

export default page;
