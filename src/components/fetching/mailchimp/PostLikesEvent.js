// Function to add liked destinations as a 'Liked destinations' event to a member
const postLikesEvent = (email, destinations) => {
  return fetch(
    process.env.REACT_APP_API_URL +
      '/member/?email=' +
      email +
      '&' +
      destinations.map(like => 'likes=' + like).join('&'),
    {
      method: 'POST',
    },
  )
}

export default postLikesEvent
