export function isValidEmail(email) {
  const emailRegex = /^[\w.-]+@[A-Za-z0-9-]+(?:\.[A-Za-z]{2,}){1,2}$/g;

  return emailRegex.test(email);
}
