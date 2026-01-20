import Link from "next/link";
import CustomImage from "../custom-image/CustomImage";
import { Product } from "@/types/__generated__/graphql";
import AddToCartButton from "../add-to-cart-btn/AddToCartButton";
import ProductNotFound from "../product-not-found/ProductNotFound";
import "./product-list.scss";

type ProductListProps = {
  products: Product[];
};

const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#ececec" offset="20%" />
      <stop stop-color="#f5f5f5" offset="50%" />
      <stop stop-color="#ececec" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#ececec" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

function ProductList({ products }: ProductListProps) {
  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  if (products.length === 0) return <ProductNotFound />;

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <Link href={`/product/${product.slug}`}>
            <div className="product-card__info">
              <div className="product-card__image-container">
                <CustomImage
                  src={product.images![0].image?.url || ""}
                  alt={product.name!}
                  fill
                  className="product-card__image"
                  data-testid="product-card-image"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(350, 350)
                  )}`}
                  loading="lazy"
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

              {product.variantType === "pieces" && (
                <li className="product-card__metric">
                  {product.fillings![0].variants![0].pieces} шт
                </li>
              )}

              {product.variantType === "size" && (
                <li className="product-card__metric">
                  {product.fillings![0].variants![0].size} см
                </li>
              )}

              {product.variantType === "weight" && (
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
