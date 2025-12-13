"use client";
import Image from "next/image";
import Link from "next/link";
import { useApolloClient } from "@apollo/client/react";
import { Product } from "@/types/__generated__/graphql";
import AddToCartButton from "../add-to-cart-btn/AddToCartButton";
import { GET_PRODUCT_DETAILS_QUERY } from "@/components/product-details/operations";
import { OrderDirection } from "@/types/__generated__/graphql";
import "./product-list.scss";

type ProductListProps = {
  products: Product[];
};

const debounce = (fn: (productSlug: string) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (productSlug: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(productSlug), delay);
  };
};

function ProductList({ products }: ProductListProps) {
  const client = useApolloClient();

  const prefetchProductDetails = (productSlug: string) => {
    client.query({
      query: GET_PRODUCT_DETAILS_QUERY,
      variables: {
        where: { slug: productSlug },
        imagesOrderBy: [{ id: OrderDirection.Asc }],
        variantsOrderBy: [{ id: OrderDirection.Asc }],
        toppingOptionOrderBy: [{ extraPrice: OrderDirection.Asc }],
      },
    });
  };

  const debouncedPrefetch = debounce(prefetchProductDetails, 150);
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <Link
            href={`/product/${product.slug}`}
            onMouseOver={() => debouncedPrefetch(product.slug!)}
          >
            <div className="product-card__info">
              <div className="product-card__image-container">
                <Image
                  src={product.images![0].image?.url || ""}
                  alt="Mock Image"
                  fill
                  className="product-card__image"
                  data-testid="product-card-image"
                />
              </div>
              <h3 className="product-card__name">{product.name}</h3>
              <p
                className="product-card__description"
                data-testid="product-card-description"
              >
                {product.baseDescription}
              </p>
            </div>
          </Link>

          <AddToCartButton
            parentComponent="product-list"
            productPrice={product.fillings![0].variants![0].price!}
            addToCartArgs={{
              productId: product.id,
              variantId: product.fillings![0].variants![0].id,
              customizations: null,
              compositionOptions: null,
              toppingOptionId: null,
            }}
          />

          <div className="product-card__banners">
            <ul className="product-card__banners-list">
              {product.badge && (
                <li className="product-card__badge">{product.badge}</li>
              )}
              {product.fillings![0].variants![0].pieces && (
                <li className="product-card__metric">
                  {product.fillings![0].variants![0].pieces} шт
                </li>
              )}
              {String(product.fillings![0].variants![0].weight) && (
                <li
                  className="product-card__metric"
                  data-testid="product-card-weight"
                >
                  {String(product.fillings![0].variants![0].weight)} г
                </li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
