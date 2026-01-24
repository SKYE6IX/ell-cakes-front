export function formatPhoneNumber(value: string) {
  let digits = value.replace(/\D/g, "");

  if (!digits.startsWith("7") || digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  }

  const match = digits.match(/^(\d{1})(\d{0,3})(\d{0,3})(\d{0,4})$/);

  if (match) {
    return `+${match[1]} ${match[2]}-${match[3]}-${match[4]}`
      .trimEnd()
      .replace(/-$/, "")
      .trimEnd()
      .replace(/-$/, "")
      .trimEnd();
  }
  return value;
}
