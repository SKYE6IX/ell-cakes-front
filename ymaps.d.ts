import type * as YMaps from "@yandex/ymaps3-types";

declare global {
  interface Window {
    ymaps3: typeof YMaps;
  }
}

export {};
