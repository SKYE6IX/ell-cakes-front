import React from "react";
import Image from "next/image";
import collectionImage from "./images/colection-image.jpg";
import "./collection.scss";

function Collection() {
  return (
    <div className="collection">
      <div className="collection__hero-section">
        <div className="collection__media">
          <div className="collection__hero-image-container">
            <Image
              src={collectionImage}
              alt="Collection Image"
              fill
              className="collection__hero-image"
            />
          </div>
          <div className="collection__hero-image-container">
            <Image
              src={collectionImage}
              alt="Collection Image"
              fill
              className="collection__hero-image"
            />
          </div>
        </div>
        <div className="collection__text-wrapper">
          <h3 className="collection__hero-heading">День Рождения</h3>
          <p className="collection__hero-text">
            Сделаем твой праздник слаще — выбери торт, который удивит гостей и
            порадует именинника!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Collection;
