export function register(data) {
  return fetch('http://localhost:3000/registration', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
}
