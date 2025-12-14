import React, { Suspense } from "react";
import { PreloadQuery } from "@/ApolloClient";
import ProductDetails from "@/components/product-details/ProductDetails";
import ProductDetailsSkeleton from "@/components/product-details/skeleton/ProductDetailsSkeleton";
import { GET_PRODUCT_DETAILS_QUERY } from "@/components/product-details/operations";
import { OrderDirection } from "@/types/__generated__/graphql";

async function page({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;

  return (
    <PreloadQuery
      query={GET_PRODUCT_DETAILS_QUERY}
      variables={{
        where: { slug: productSlug },
        imagesOrderBy: [{ id: OrderDirection.Asc }],
        variantsOrderBy: [{ price: OrderDirection.Asc }],
        toppingOptionOrderBy: [
          {
            extraPrice: OrderDirection.Asc,
          },
        ],
      }}
    >
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails productSlug={productSlug} />
      </Suspense>
    </PreloadQuery>
  );
}
export default page;
