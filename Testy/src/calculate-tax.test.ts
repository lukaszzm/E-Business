import { describe, it, expect } from "vitest";
import { calculateTax } from "./calculate-tax";

describe("calculateTax", () => {
  it("should calculate tax correctly with default tax rate (0.08)", () => {
    const subtotal = 100;
    const result = calculateTax(subtotal);
    expect(result).toBe(8);
  });

  it("should calculate tax correctly with custom tax rate", () => {
    const subtotal = 100;
    const taxRate = 0.1;
    const result = calculateTax(subtotal, taxRate);
    expect(result).toBe(10);
  });

  it("should handle zero subtotal with default tax rate", () => {
    const subtotal = 0;
    const result = calculateTax(subtotal);
    expect(result).toBe(0);
  });

  it("should handle zero subtotal with custom tax rate", () => {
    const subtotal = 0;
    const taxRate = 0.15;
    const result = calculateTax(subtotal, taxRate);
    expect(result).toBe(0);
  });

  it("should handle zero tax rate", () => {
    const subtotal = 100;
    const taxRate = 0;
    const result = calculateTax(subtotal, taxRate);
    expect(result).toBe(0);
  });

  it("should handle decimal subtotals correctly", () => {
    const subtotal = 99.99;
    const result = calculateTax(subtotal);
    expect(result).toBeCloseTo(8, 1);
  });

  it("should handle high tax rates correctly", () => {
    const subtotal = 100;
    const taxRate = 0.25;
    const result = calculateTax(subtotal, taxRate);
    expect(result).toBe(25);
  });

  it("should handle negative subtotals", () => {
    const subtotal = -50;
    const result = calculateTax(subtotal);
    expect(result).toBe(-4);
  });

  it("should handle large subtotals", () => {
    const subtotal = 10000;
    const result = calculateTax(subtotal);
    expect(result).toBe(800);
  });

  it("should handle small fractional subtotals", () => {
    const subtotal = 0.01;
    const result = calculateTax(subtotal);
    expect(result).toBeCloseTo(0.0008, 4);
  });
});
