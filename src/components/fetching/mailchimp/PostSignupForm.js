// Returns id (string) of new user, or null if user already exists
const postSignupForm = (email, status, location, likes) => {
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
    ? baseQuery + '&' + likes.map(like => 'likes=' + like).join('&')
    : baseQuery
  return fetch(query, {
    method: 'POST',
  }).then(response => response.json())
}

export default postSignupForm
