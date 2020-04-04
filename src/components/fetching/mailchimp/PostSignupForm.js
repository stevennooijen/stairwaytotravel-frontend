// Returns id (string) of new user, or null if user already exists
const postSignupForm = (email, status, location, likes, bookingPreferences) => {
  const baseQuery =
    process.env.REACT_APP_API_URL +
    '/signup/?email=' +
    email +
    '&status=' +
    status +
    '&location=' +
    location
  // Extend query if likes provided
  const query = likes
    ? baseQuery +
      '&' +
      likes.map(like => 'likes=' + like).join('&') +
      // add booking preferences
      '&' +
      bookingPreferences
        .filter(item => item.value === true)
        .map(item => item.key + '=' + item.value)
        .join('&')
    : baseQuery
  return fetch(query, {
    method: 'POST',
  }).then(response => response.json())
}

export default postSignupForm
