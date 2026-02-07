interface Args {
  userId: string | undefined;
  deliveryZonePrice: number;
  deliveryAddressId: string | undefined;
  paymentMethod: string;
}

export function canCheckout({
  userId,
  deliveryAddressId,
  deliveryZonePrice,
  paymentMethod,
}: Args) {
  const isDeliveryPickUp = deliveryZonePrice === 0;
  // If user pick a self- pcikup then let it passed without checking for
  // delivey address
  if (isDeliveryPickUp && userId && paymentMethod) {
    return true;
    // If useer pick diffrent option for delively that include a price
  }
  if (!isDeliveryPickUp && deliveryAddressId && userId && paymentMethod) {
    return true;
  }

  return false;
}
