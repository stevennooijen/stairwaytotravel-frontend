// Returns id (string) of existing user, or null if it doesn't exist
const getMember = email => {
  return fetch(process.env.REACT_APP_API_URL + '/signup/?email=' + email, {
    method: 'GET',
  }).then(response => response.json())
}

export default getMember
