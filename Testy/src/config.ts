export const Coupons = {
  SAVE10: 0.1,
  SAVE20: 0.2,
  FREE: 1.0,
} as const satisfies Record<string, number>;

export type Coupon = keyof typeof Coupons;
