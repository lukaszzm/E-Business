import { describe, expect, it } from "vitest";

import { calculateShipping } from "./calculate-shipping";

describe("calculateShipping", () => {
  it("should return 0 when subtotal is greater than 50", () => {
    const subtotal = 51;
    const result = calculateShipping(subtotal);
    expect(result).toBe(0);
  });

  it("should return 5.99 when subtotal is exactly 50", () => {
    const subtotal = 50;
    const result = calculateShipping(subtotal);
    expect(result).toBe(5.99);
  });

  it("should return 5.99 when subtotal is less than 50", () => {
    const subtotal = 49.99;
    const result = calculateShipping(subtotal);
    expect(result).toBe(5.99);
  });
});
