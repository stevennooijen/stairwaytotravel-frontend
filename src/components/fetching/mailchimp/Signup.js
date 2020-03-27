// Returns id (string) of new user, or null if user already exists
const signup = (email, status, location) => {
  return fetch(
    process.env.REACT_APP_API_URL +
      '/signup/?email=' +
      email +
      '&status=' +
      status +
      '&location=' +
      location,
    {
      method: 'POST',
    },
  ).then(response => response.json())
}

export default signup
