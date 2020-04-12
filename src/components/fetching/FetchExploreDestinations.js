// Call an API, API_URL is retrieved from .env files
const FetchExploreDestinations = (seed, nResults, offset, bounds) => {
  const baseQuery =
    process.env.REACT_APP_API_URL +
    '/api/explore/?' +
    'seed=' +
    seed +
    '&n_results=' +
    nResults +
    '&offset=' +
    offset
  const query = bounds
    ? baseQuery +
      '&ne_lat=' +
      bounds.ne.lat +
      '&ne_lng=' +
      bounds.ne.lng +
      '&sw_lat=' +
      bounds.sw.lat +
      '&sw_lng=' +
      bounds.sw.lng
    : baseQuery
  return fetch(query)
}

export default FetchExploreDestinations
