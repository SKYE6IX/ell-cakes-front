import React from "react";
import Image from "next/image";
import PlusIcon from "@/components/icons/PlusIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import image1 from "./mockImage/img-1.png";
import image2 from "./mockImage/img-2.png";
import image3 from "./mockImage/img-3.png";
import image4 from "./mockImage/img-4.png";
import image5 from "./mockImage/img-5.png";
import "./mix-product-option.scss";

const lists = [
  { name: "Сникерс", image: image1 },
  { name: "Шоколадные", image: image2 },
  { name: "Клубничные", image: image3 },
  { name: "Мятные", image: image4 },
  { name: "Сливочные", image: image5 },
];

function MixProductOption() {
  return (
    <div className="mix-product-option">
      <ul className="mix-product-option__lists">
        {lists.map((list) => (
          <li key={list.name} className="mix-product-option__item">
            <div className="mix-product-option__image-wrapper">
              <Image
                src={list.image}
                alt={list.name}
                fill
                className="mix-product-option__image"
              />
            </div>
            <span className="mix-product-option__name">{list.name}</span>
            <div className="mix-product-option__action-wrapper">
              <button className="mix-product-option__btn minus">
                <MinusIcon />
              </button>
              <span className="mix-product-option__value">2</span>
              <button className="mix-product-option__btn plus">
                <PlusIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MixProductOption;
