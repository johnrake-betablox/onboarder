import { formatCents } from "./format-cents";

describe("formatCents", () => {
  test.each([
    [1, "$0.01"],
    [10, "$0.10"],
    [1000, "$10.00"],
    [1021, "$10.21"],
    [12345, "$123.45"],
    [99, "$0.99"],
    [999, "$9.99"],
    [9999, "$99.99"],
    [0, "$0.00"],
  ])("should convert %s to %s", (value, expected) => {
    expect(formatCents(value)).toEqual(expected);
  });
});
