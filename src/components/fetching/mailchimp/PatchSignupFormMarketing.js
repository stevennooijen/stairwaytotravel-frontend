const patchSignupFormMarketing = email => {
  return fetch(
    process.env.REACT_APP_API_URL +
      '/signup/?email=' +
      email +
      '&marketing=true',
    {
      method: 'PATCH',
    },
  ).then(response => response.json())
}

export default patchSignupFormMarketing
