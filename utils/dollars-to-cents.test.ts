import { dollarsToCents } from "./dollars-to-cents";

describe("dollarsToCents", () => {
  test.each([
    [1, 100],
    [10, 1000],
    [10.21, 1021],
    [123.45, 12345],
    [0.99, 99],
    [9.99, 999],
    [99.99, 9999],
    [0, 0],
  ])("should convert %s to %s", (value, expected) => {
    expect(dollarsToCents(value)).toEqual(expected);
  });
});
