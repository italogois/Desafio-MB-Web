export function isValidPhone(value) {
  const cleanedValue = value.replace(/[^\d]/g, '');

  const phoneRegExp = /^[1-9]{2}9\d{8}$/;

  return phoneRegExp.test(cleanedValue);
}
