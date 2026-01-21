"use client";
import { useState, useRef, useEffect } from "react";
import { useReadQuery, QueryRef } from "@apollo/client/react";
import CustomImage from "@/components/custom-image/CustomImage";
import { ProductImage, ProductVideo } from "@/types/__generated__/graphql";
import "./product-gallery.scss";

type ProductGalleryProps = {
  imagesQueryRef: QueryRef<{ productImages: ProductImage[] }>;
  videoQueryRef: QueryRef<{ productVideo: ProductVideo }>;
};

function ProductGallery({
  imagesQueryRef,
  videoQueryRef,
}: ProductGalleryProps) {
  const { data: imagesData } = useReadQuery(imagesQueryRef);

  const { data: videoData } = useReadQuery(videoQueryRef);

  const productImages = imagesData.productImages;
  const productVideo = videoData.productVideo;

  const productMedia = productVideo
    ? [...productImages, productVideo]
    : [...productImages];

  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideItemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
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
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              setActiveIdx(newIdx);
            }, 500);
          }
        }
      },
      {
        root: containerRef.current,
        threshold: 0.9,
      }
    );

    slideItemRefs.current?.forEach((slideItem) => observer.observe(slideItem));

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const changeActiveIdx = (newIdx: number) => {
    setActiveIdx(newIdx);
    const nextSlide = slideItemRefs.current[newIdx];
    containerRef.current?.scrollTo({
      left: nextSlide.offsetLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className="product-gallery">
      <div className="product-gallery__thumbnails">
        {productMedia.map((media, idx) => (
          <div
            key={media.id}
            className={[
              "product-gallery__thumbnail",
              idx === activeIdx ? "active" : "",
            ].join(" ")}
            onClick={() => changeActiveIdx(idx)}
          >
            {media.__typename === "ProductImage" && (
              <CustomImage
                src={media.image?.url || ""}
                alt={media.altText || "Product Image"}
                fill={true}
                className="product-gallery__thumbnail-image"
                data-testid="product-image-thumbnail"
                loading="eager"
              />
            )}
            {media.__typename === "ProductVideo" && (
              <video
                className="product-gallery__thumbnail-video"
                autoPlay={false}
                muted
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
              >
                <source src={videoData.productVideo.video?.url} />
              </video>
            )}
          </div>
        ))}
      </div>

      <div className="product-gallery__main" ref={containerRef}>
        {productMedia.map((media, idx) => (
          <div
            key={media.id}
            className={[
              "product-gallery__stack",
              idx === activeIdx ? "show" : "",
            ].join(" ")}
            ref={(el) => {
              if (el) {
                slideItemRefs.current[idx] = el;
              }
            }}
          >
            {media.__typename === "ProductImage" && (
              <div className="product-gallery__image-container">
                <CustomImage
                  src={media.image?.url || ""}
                  alt={media.altText || "Product Image"}
                  fill={true}
                  className="product-gallery__image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  data-testid="product-image-view"
                  loading="eager"
                />
              </div>
            )}
            {media.__typename === "ProductVideo" && (
              <div className="product-gallery__video-container">
                <video
                  className="product-gallery__video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  webkit-playsinline
                  controls={false}
                  disablePictureInPicture
                  disableRemotePlayback
                >
                  <source src={media.video?.url} />
                </video>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
