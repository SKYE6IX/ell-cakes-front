import React from "react";
import Image, { ImageProps } from "next/image";
import imageProxyLoaders from "./imageLoader";

function CustomImage({ src, alt, ...props }: ImageProps) {
  return <Image src={src} alt={alt} {...props} loader={imageProxyLoaders} />;
}

export default CustomImage;
