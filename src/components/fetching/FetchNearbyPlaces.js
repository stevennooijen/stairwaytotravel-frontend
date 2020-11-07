const fetchNearbyPlaces = (id, nResults = 12) => {
  let query = process.env.REACT_APP_API_URL + '/api/nearby/' + id

  if (nResults) {
    query = query + '?n_results=' + nResults
  }

  return fetch(query)
}

export default fetchNearbyPlaces
