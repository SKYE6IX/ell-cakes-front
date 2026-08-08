import { type ImageLoaderProps } from "next/image";
import { generateUrl } from "@imgproxy/imgproxy-js-core";

const imgproxyEndpoint = process.env.NEXT_PUBLIC_IMGPROXY_ENDPOINT;
const imgproxyBaseUrl = process.env.NEXT_PUBLIC_IMGPROXY_BASE_URL;

export default function imageProxyLoader({ src, width, quality }: ImageLoaderProps) {
  const isLocal = src.startsWith("/");
  const fullSrc = isLocal ? new URL(src, imgproxyBaseUrl).toString() : new URL(src).toString();

  const escapedSrc = fullSrc.replace("%", "%25").replace("?", "%3F").replace("@", "%40");

  const path = generateUrl(
    { value: escapedSrc, type: "plain" },
    { width: width ?? 1000, format: "webp", quality: quality ?? 80 },
  );

  // console.log("produce path: " + path);

  return `${imgproxyEndpoint}/unsafe${path}`;
}
