export function canCheckout(
  userId: string | undefined,
  deliveryAddressId: string | undefined,
  shippingCost: number,
  paymentMethod: string
) {
  if (userId && deliveryAddressId && shippingCost && paymentMethod) {
    return true;
  }
  return false;
}
