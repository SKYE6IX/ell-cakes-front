import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ProductImage } from "@/types/__generated__/graphql";
import "./product-image-gallery.scss";

type ProductGalleryProps = {
  productImages: ProductImage[];
};

function ProductGallery({ productImages }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideItemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSlide = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visibleSlide) {
          const newIdx = slideItemRefs.current?.indexOf(
            visibleSlide.target as HTMLDivElement
          );
          if (newIdx !== -1) {
            setActiveIdx(newIdx);
          }
        }
      },
      {
        root: containerRef.current,
        threshold: 0.9,
      }
    );
    slideItemRefs.current?.forEach((slideItem) => observer.observe(slideItem));
    return () => observer.disconnect();
  }, []);

  const changeActiveIdx = (newIdx: number) => {
    setActiveIdx(newIdx);
  };

  return (
    <div className="product-image-gallery">
      <div className="product-image-gallery__thumbnails">
        {productImages.map((productImage, idx) => (
          <div
            key={productImage.id}
            className={[
              "product-image-gallery__thumbnail",
              idx === activeIdx ? "active" : "",
            ].join(" ")}
            onClick={() => changeActiveIdx(idx)}
          >
            <Image
              src={productImage.image?.url || ""}
              alt="Product Image"
              fill={true}
              className="product-image-gallery__thumbnail-image"
              data-testid="product-image-thumbnail"
            />
          </div>
        ))}
      </div>

      <div className="product-image-gallery__main" ref={containerRef}>
        {productImages.map((productImage, idx) => (
          <div
            key={productImage.id}
            className={[
              "product-image-gallery__image-stack",
              idx === activeIdx ? "show" : "",
            ].join(" ")}
            ref={(el) => {
              if (el) {
                slideItemRefs.current[idx] = el;
              }
            }}
          >
            <div className="product-image-gallery__image-container">
              <Image
                src={productImage.image?.url || ""}
                alt="Mock Image"
                fill={true}
                className="product-image-gallery__image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-testid="product-image-view"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
