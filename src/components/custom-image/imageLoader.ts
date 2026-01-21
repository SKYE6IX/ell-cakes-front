import { type ImageLoaderProps } from "next/image";
import { generateUrl } from "@imgproxy/imgproxy-js-core";

// The address of imgproxy server
const imgproxyEndpoint = process.env.NEXT_PUBLIC_IMGPROXY_ENDPOINT;
export default function imageProxyLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const fullSrc = new URL(src).toString();
  const escapedSrc = fullSrc
    .replace("%", "%25")
    .replace("?", "%3F")
    .replace("@", "%40");

  const path = generateUrl(
    { value: escapedSrc, type: "plain" },
    { width: width ?? 1000, format: "webp", quality: quality ?? 80 }
  );

  return `${imgproxyEndpoint}/unsafe${path}`;
}
