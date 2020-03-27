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
  )
}

export default signup
