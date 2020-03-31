const patchMemberLikesHtml = (email, likes) => {
  return fetch(
    process.env.REACT_APP_API_URL +
      '/signup/?email=' +
      email +
      '&' +
      likes.map(like => 'likes=' + like).join('&'),
    {
      method: 'PATCH',
    },
  ).then(response => response.json())
}

export default patchMemberLikesHtml
