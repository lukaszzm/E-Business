import { describe, it, expect } from "vitest";
import { calculateCartTotal } from "./calculate-cart-total";
import type { LineItem } from "./types";

describe("calculateCartTotal", () => {
  it("should calculate the total for an empty cart", () => {
    const items: LineItem[] = [];
    const result = calculateCartTotal(items);
    expect(result).toBe(0);
  });

  it("should calculate the total for a single item with quantity 1", () => {
    const items: LineItem[] = [{ price: 10, quantity: 1 }];
    const result = calculateCartTotal(items);
    expect(result).toBe(10);
  });

  it("should calculate the total for a single item with quantity greater than 1", () => {
    const items: LineItem[] = [{ price: 10, quantity: 3 }];
    const result = calculateCartTotal(items);
    expect(result).toBe(30);
  });

  it("should calculate the total for multiple items with different quantities", () => {
    const items: LineItem[] = [
      { price: 10, quantity: 2 },
      { price: 15, quantity: 3 },
      { price: 20, quantity: 1 },
    ];
    const result = calculateCartTotal(items);
    expect(result).toBe(10 * 2 + 15 * 3 + 20 * 1);
  });

  it("should use quantity 1 when quantity is not provided", () => {
    const items: LineItem[] = [{ price: 10 }, { price: 15, quantity: 2 }];
    const result = calculateCartTotal(items);
    expect(result).toBe(10 * 1 + 15 * 2);
  });

  it("should handle zero price items", () => {
    const items: LineItem[] = [
      { price: 0, quantity: 5 },
      { price: 10, quantity: 2 },
    ];
    const result = calculateCartTotal(items);
    expect(result).toBe(0 * 5 + 10 * 2);
  });

  it("should handle zero quantity items", () => {
    const items: LineItem[] = [
      { price: 10, quantity: 0 },
      { price: 15, quantity: 2 },
    ];
    const result = calculateCartTotal(items);
    expect(result).toBe(10 * 0 + 15 * 2);
  });

  it("should handle fractional prices and quantities", () => {
    const items: LineItem[] = [
      { price: 10.5, quantity: 2 },
      { price: 3.33, quantity: 1.5 },
    ];
    const result = calculateCartTotal(items);
    expect(result).toBeCloseTo(10.5 * 2 + 3.33 * 1.5);
  });

  it("should handle a large number of items", () => {
    const items: LineItem[] = Array(100)
      .fill(null)
      .map(() => ({
        price: 1,
        quantity: 1,
      }));
    const result = calculateCartTotal(items);
    expect(result).toBe(100);
  });
});
