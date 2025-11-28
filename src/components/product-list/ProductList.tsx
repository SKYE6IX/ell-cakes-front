"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/__generated__/graphql";
import CartIcon from "../icons/CartIcon";
import PlusIcon from "../icons/PlusIcon";
import MinusIcon from "../icons/MinusIcon";
import "./product-list.scss";

// Update the component to render a message if there if there is not product available,
// By render We out of stocks for these product, please check back later
type ProductListProps = {
  products: Product[];
};

function ProductList({ products }: ProductListProps) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <Link href={`/product/${product.slug}`}>
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

          <div className="product-card__btn-container">
            <button className="product-card__cart-btn">
              <span className="product-card__cart-icon">
                <CartIcon />
              </span>
              <span
                className="product-card__price"
                data-testid="product-card-price"
              >
                {product.fillings![0].variants![0].price} ₽
              </span>
            </button>

            <div className="product-card__cart-active">
              <button className="product-card__cart-active-btn remove">
                <MinusIcon />
              </button>
              <div className="product-card__cart-value">
                <span className="product-card__cart-qty">1X</span>
                <span className="product-card__cart-price">3200 ₽</span>
              </div>
              <button className="product-card__cart-active-btn add">
                <PlusIcon />
              </button>
            </div>
          </div>

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
