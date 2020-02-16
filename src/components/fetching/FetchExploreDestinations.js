// Call an API, API_URL is retrieved from .env files
const FetchExploreDestinations = bounds => {
  // return search as requested by sessionStorage (=Search tab)
  if (bounds) {
    return fetch(
      process.env.REACT_APP_API_URL +
        '/api/explore/?' +
        'ne_lat=' +
        bounds.ne.lat +
        '&ne_lng=' +
        bounds.ne.lng +
        '&sw_lat=' +
        bounds.sw.lat +
        '&sw_lng=' +
        bounds.sw.lng,
    )
    // return random destination
  } else {
    return fetch(process.env.REACT_APP_API_URL + '/api/explore')
  }
}

export default FetchExploreDestinations
