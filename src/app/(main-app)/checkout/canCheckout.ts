import type { CheckoutState } from "./checkoutReducer";

type Args = CheckoutState & {
  userId: string | undefined;
  deliveryAddressId: string | undefined;
};

export function canCheckout({
  userId,
  hasOrderReceiver,
  orderReceiver,
  initialZonePrice,
  deliveryAddressId,
  deliveryDate,
}: Args) {
  if (!userId) return false;

  if (!deliveryDate) return false;

  if (hasOrderReceiver) {
    if (!orderReceiver) return false;
    const hasValidName = orderReceiver.name?.trim().length > 0;
    const hasValidPhone = orderReceiver.phoneNumber?.trim().length > 0;
    if (!hasValidName || !hasValidPhone) return false;
  }

  const isSelfPickup = initialZonePrice === 0;
  if (!isSelfPickup && !deliveryAddressId) return false;

  return true;
}
