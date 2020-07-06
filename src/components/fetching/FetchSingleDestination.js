const fetchSingleDestination = (id, profiles) => {
  let query = process.env.REACT_APP_API_URL + '/api/' + id

  if (profiles && profiles.length > 0) {
    query = query + '?profiles=' + profiles.join('&profiles=')
  }
  return fetch(query)
}

export default fetchSingleDestination
