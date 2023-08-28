import { getTimeZones } from "@vvo/tzdb";

const UNITED_STATUS = "US";

export function getTimeZoneOptions(countryCode: string = UNITED_STATUS) {
  return getTimeZones()
    .filter((timezone) => timezone.countryCode === countryCode)
    .map((timezone) => ({
      label: timezone.currentTimeFormat,
      value: timezone.name,
    }));
}
