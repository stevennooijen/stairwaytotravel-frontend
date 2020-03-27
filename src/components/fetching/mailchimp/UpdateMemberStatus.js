const updateMemberStatus = (email, status) => {
  return fetch(
    process.env.REACT_APP_API_URL +
      '/signup/?email=' +
      email +
      '&status=' +
      status,
    {
      method: 'PATCH',
    },
  ).then(response => response.json())
}

export default updateMemberStatus
