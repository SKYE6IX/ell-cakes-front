import Image, { StaticImageData } from "next/image";
import "./about-media.scss";

type AboutMediaProps = {
  src: StaticImageData | string | null;
  alt: string;
  sizes: string;
  className?: string;
};

function AboutMedia({ src, alt, sizes, className }: AboutMediaProps) {
  return (
    <div className={["about-media", className].join(" ")}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="about-media__image"
        />
      )}
    </div>
  );
}

export default AboutMedia;
