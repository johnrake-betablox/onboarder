import { centsToDollars } from "./cents-to-dollars";

export function formatCents(cents: number): String {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(centsToDollars(cents));
}
