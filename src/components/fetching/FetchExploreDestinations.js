// Call an API, API_URL is retrieved from .env files
const FetchExploreDestinations = (
  seed,
  nResults,
  offset,
  bounds,
  country,
  profiles,
) => {
  let query =
    process.env.REACT_APP_API_URL +
    '/api/explore/?' +
    'seed=' +
    seed +
    '&n_results=' +
    nResults +
    '&offset=' +
    offset

  if (country) {
    query = query + '&country=' + country
  }
  if (bounds) {
    query =
      query +
      '&ne_lat=' +
      bounds.ne.lat +
      '&ne_lng=' +
      bounds.ne.lng +
      '&sw_lat=' +
      bounds.sw.lat +
      '&sw_lng=' +
      bounds.sw.lng
  }
  if (profiles && profiles.length > 0) {
    query = query + '&profiles=' + profiles.join('&profiles=')
  }
  return fetch(query)
}

export default FetchExploreDestinations
