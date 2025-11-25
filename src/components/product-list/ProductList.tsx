import React from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "../icons/CartIcon";
import mockImage from "./mock-image.jpg";

import "./product-list.scss";

function ProductList() {
  return (
    <div className="product-list">
      {Array.from({ length: 4 }).map((product, i) => (
        <div className="product-card" key={i}>
          <Link href={`/`}>
            <div className="product-card__info">
              <div className="product-card__image-container">
                <Image
                  src={mockImage}
                  alt="Mock Image"
                  fill
                  className="product-card__image"
                />
              </div>
              <h3 className="product-card__name">Птичье молоко</h3>
              <p className="product-card__description">
                 Воздушное сливочное суфле со свежей клубникой или малиной
                внутри, тонкие суфле со свежей клубникой или малиной внутри,
                тонкие.
              </p>
            </div>
          </Link>

          <div className="product-card__btn-container">
            <button className="product-card__cart-btn">
              <span className="product-card__cart-icon">
                <CartIcon />
              </span>
              <span className="product-card__price">3200 ₽</span>
            </button>
          </div>
          <div className="product-card__banners">
            <ul className="product-card__banners-list">
              <li className="product-card__badge">новинка</li>
              <li className="product-card__metric">1000 г</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
