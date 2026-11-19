export function getFutureDate(daysToAdd: number = 1) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd + 1);
  return new Date(date);
}
