import { centsToDollars } from "./cents-to-dollars";

describe("centsToDollars", () => {
  test.each([
    [100, 1],
    [1000, 10],
    [1021, 10.21],
    [12345, 123.45],
    [99, 0.99],
    [999, 9.99],
    [9999, 99.99],
    [0, 0],
  ])("should convert %s to %s", (value, expected) => {
    expect(centsToDollars(value)).toEqual(expected);
  });
});
