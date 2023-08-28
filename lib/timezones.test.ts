/**
 * @jest-environment node
 */
import { getTimeZoneOptions } from "./timezones";

describe("timezones", () => {
  it("returns timezone options", () => {
    const options = getTimeZoneOptions();
    expect(options).toEqual([
      {
        label:
          "-10:00 Hawaii-Aleutian Time - Honolulu, East Honolulu, Pearl City, Hilo",
        value: "Pacific/Honolulu",
      },
      {
        label: "-09:00 Hawaii-Aleutian Time - Adak",
        value: "America/Adak",
      },
      {
        label: "-08:00 Alaska Time - Anchorage, Juneau, Fairbanks, Eagle River",
        value: "America/Anchorage",
      },
      {
        label: "-07:00 Mountain Time - Phoenix, Tucson, Mesa, Chandler",
        value: "America/Phoenix",
      },
      {
        label:
          "-07:00 Pacific Time - Los Angeles, San Diego, San Jose, San Francisco",
        value: "America/Los_Angeles",
      },
      {
        label:
          "-06:00 Mountain Time - Denver, El Paso, Albuquerque, Colorado Springs",
        value: "America/Denver",
      },
      {
        label: "-05:00 Central Time - Chicago, Houston, San Antonio, Dallas",
        value: "America/Chicago",
      },
      {
        label:
          "-04:00 Eastern Time - New York City, Brooklyn, Queens, Philadelphia",
        value: "America/New_York",
      },
    ]);
  });
});
