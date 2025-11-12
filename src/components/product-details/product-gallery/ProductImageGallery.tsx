import React from "react";
import Image from "next/image";
import image1 from "./mock-images/img-1.png";
import image2 from "./mock-images/img-2.png";
import image3 from "./mock-images/img-3.png";
import image4 from "./mock-images/img-4.png";
import "./product-image-gallery.scss";

const mocksImages = [image1, image2, image3, image4];

function ProductGallery() {
  return (
    <div className="product-image-gallery">
      <div className="product-image-gallery__thumbnails">
        {mocksImages.map((img, idx) => (
          <div key={idx} className="product-image-gallery__thumbnail">
            <Image
              src={img}
              alt="Mock Image"
              fill={true}
              className="product-image-gallery__thumbnail-image"
            />
          </div>
        ))}
      </div>
      <div className="product-image-gallery__main">
        {mocksImages.map((img, idx) => (
          <div key={idx} className="product-image-gallery__image-stack">
            <div className="product-image-gallery__image-container">
              <Image
                src={img}
                alt="Mock Image"
                fill={true}
                className="product-image-gallery__image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
