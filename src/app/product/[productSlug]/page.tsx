import { Suspense } from "react";
import { PreloadQuery } from "@/ApolloClient";
import ProductDetails from "@/components/product-details/ProductDetails";
import { GET_PRODUCT_DETAILS_QUERY } from "@/components/product-details/operations";

async function page({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;

  return <ProductDetails productSlug={productSlug} />;
}
export default page;
