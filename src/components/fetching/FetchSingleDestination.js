const fetchSingleDestination = id => {
  return fetch(process.env.REACT_APP_API_URL + '/api/' + id)
}

export default fetchSingleDestination
