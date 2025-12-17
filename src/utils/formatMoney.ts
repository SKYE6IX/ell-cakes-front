export const formatMoney = (value: number) => {
  const format = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    currencyDisplay: "symbol",
  }).format(value);

  return format;
};
