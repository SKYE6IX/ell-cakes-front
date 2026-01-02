"use client";
import { useSuspenseQuery } from "@apollo/client/react";
import ProductList from "../product-list/ProductList";
import {
  OrderDirection,
  ProductWhereInput,
} from "@/types/__generated__/graphql";
import { GET_PRODUCTS_BY_CATEGORY } from "./operation";

interface CollectionProductsProps {
  where: ProductWhereInput;
}

function CollectionProducts({ where }: CollectionProductsProps) {
  const TAKE_FILLINGS_NUM = 1;
  const TAKE_VARIANTS_NUM = 1;

  const { data } = useSuspenseQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: {
      where,
      takeFillings: TAKE_FILLINGS_NUM,
      takeVariants: TAKE_VARIANTS_NUM,
      orderVariantsBy: [{ price: OrderDirection.Asc }],
      imagesOrderBy: [{ id: OrderDirection.Asc }],
    },
  });

  return <ProductList products={data.products} />;
}

export default CollectionProducts;
