import { describe, it, expect, vi, beforeEach } from "vitest";
import { Coupons, type Coupon } from "./config"; // This import should match your actual file structure
import { calculateDiscount } from "./calculate-discount";

describe("calculateDiscount", () => {
  it("should calculate 10% discount correctly", () => {
    const subtotal = 100;
    const couponCode = "SAVE10";
    const result = calculateDiscount(subtotal, couponCode);
    expect(result).toBe(10);
  });

  it("should calculate 20% discount correctly", () => {
    const subtotal = 200;
    const couponCode = "SAVE20";
    const result = calculateDiscount(subtotal, couponCode);
    expect(result).toBe(40);
  });

  it("should return full subtotal value for 100% discount", () => {
    const subtotal = 250;
    const couponCode = "FREE";
    const result = calculateDiscount(subtotal, couponCode);
    expect(result).toBe(250);
  });

  it("should handle non-existent coupon codes by returning 0", () => {
    const subtotal = 100;
    const couponCode = "INVALID" as Coupon;
    const result = calculateDiscount(subtotal, couponCode);
    expect(result).toBe(0);
  });
});
