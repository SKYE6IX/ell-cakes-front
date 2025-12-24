/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  booleanPointInPolygon,
  distance,
  nearestPointOnLine,
  point,
  polygonToLine,
} from "@turf/turf";
import type { DrawingStyle, PolygonGeometry } from "ymaps3";
import { OUT_OF_ZONES_PRICE, ZONE } from "./y-map-variables";

export type MapZone = {
  style: DrawingStyle;
  geometry: PolygonGeometry;
  price: number;
  priority: number;
  name: string;
};

export function calculateDeliveryPrice(destinationCoords: [number, number]) {
  const destPoint = point(destinationCoords);

  const currentZone = ZONE;

  const pointIsInZones = booleanPointInPolygon(
    destPoint,
    currentZone.geometry as any
  );

  if (pointIsInZones) {
    return {
      price: currentZone.price,
    };
  }

  const line = polygonToLine(currentZone.geometry as any);

  const nearest = nearestPointOnLine(line as any, destPoint);

  const outOfZoneDistance = distance(nearest, destPoint, {
    units: "kilometers",
  });

  const price = currentZone.price + OUT_OF_ZONES_PRICE * outOfZoneDistance;

  return {
    price: Math.round(price),
  };
}

export const getCoordinate = async (address: string) => {
  await window.ymaps3.ready;

  const results = await window.ymaps3.search({
    text: address,
    limit: 5,
  });

  if (!results[0]) return;

  if (results[0].geometry && results[0].geometry.coordinates.length < 1) return;

  const finalResult = results[0];

  return finalResult;
};
