"use client";
import { Suspense } from "react";
import { useSuspenseQuery } from "@apollo/client/react";
import ProductList from "@/components/product-list/ProductList";
import ProductListSkeleton from "@/components/product-list/ProductListSkeleton";
import ProductNotFound from "@/components/product-not-found/ProductNotFound";
import { GET_FEATURED_PRODUCTS_QUERY } from "../operation";
import { OrderDirection } from "@/types/__generated__/graphql";

const TAKE_FILLINGS_NUM = 1;
const TAKE_VARIANTS_NUM = 1;
const TAKE_FEATURED_PRODUCTS = 8;

function FeaturedProducts() {
  const { data } = useSuspenseQuery(GET_FEATURED_PRODUCTS_QUERY, {
    variables: {
      takeFeaturedProducts: TAKE_FEATURED_PRODUCTS,
      takeFillings: TAKE_FILLINGS_NUM,
      takeVariants: TAKE_VARIANTS_NUM,
      variantsOrderBy: [{ price: OrderDirection.Asc }],
      imagesOrderBy: [{ id: OrderDirection.Asc }],
    },
  });

  const featured = data.featuredProducts;

  if (featured && featured.length < 1) {
    return <ProductNotFound />;
  }

  const products = featured[0].products!;
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductList products={products} />
    </Suspense>
  );
}

export default FeaturedProducts;
