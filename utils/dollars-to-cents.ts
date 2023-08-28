export function dollarsToCents(dollars: number): number {
  return parseInt((dollars * 100).toFixed(0), 10);
}
