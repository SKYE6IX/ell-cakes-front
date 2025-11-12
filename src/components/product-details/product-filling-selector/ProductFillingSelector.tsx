import React from "react";
import Image from "next/image";
import image1 from "./mockImage/img-1.png";
import image2 from "./mockImage/img-2.png";
import image3 from "./mockImage/img-3.png";
import image4 from "./mockImage/img-4.png";
import image5 from "./mockImage/img-5.png";
import image6 from "./mockImage/img-6.png";
import "./product-filling-selector.scss";

const mocksImages = [image1, image2, image3, image4, image5, image6];

function ProductFillingSelector() {
  return (
    <div className="product-filling-selector">
      <ul className="product-filling-selector__list">
        {mocksImages.map((img, idx) => (
          <li key={idx} className="product-filling-selector__item">
            <div className="product-filling-selector__image-container">
              <Image
                src={img}
                alt="Mock Image"
                fill
                className="product-filling-selector__image"
              />
            </div>
            <h5 className="product-filling-selector__name">мильфей</h5>
          </li>
        ))}
      </ul>
      <p className="product-filling-selector__description">
        Тоненькие медовые коржи, промазанные сметанно-карамельным кремом
      </p>
    </div>
  );
}

export default ProductFillingSelector;
