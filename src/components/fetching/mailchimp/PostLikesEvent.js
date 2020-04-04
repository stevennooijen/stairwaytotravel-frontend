// Function to add liked destinations as a 'Liked destinations' event to a member
const postLikesEvent = (email, destinations, bookingPreferences) => {
  return fetch(
    process.env.REACT_APP_API_URL +
      '/member/?email=' +
      email +
      '&' +
      destinations.map(like => 'likes=' + like).join('&') +
      // add booking preferences
      '&' +
      bookingPreferences
        .filter(item => item.value === true)
        .map(item => item.key + '=' + item.value)
        .join('&'),
    {
      method: 'POST',
    },
  )
}

export default postLikesEvent
