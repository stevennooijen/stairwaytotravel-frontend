const patchMemberLikesHtml = (email, likes, bookingPreferences) => {
  return fetch(
    process.env.REACT_APP_API_URL +
      '/signup/?email=' +
      email +
      '&' +
      likes.map(like => 'likes=' + like).join('&') +
      // add booking preferences
      '&' +
      bookingPreferences
        .filter(item => item.value === true)
        .map(item => item.key + '=' + item.value)
        .join('&'),
    {
      method: 'PATCH',
    },
  ).then(response => response.json())
}

export default patchMemberLikesHtml
