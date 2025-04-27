import { Coupons, type Coupon } from "./config";

export function calculateDiscount(
  subtotal: number,
  couponCode: Coupon
): number {
  return subtotal * (Coupons[couponCode] || 0);
}
