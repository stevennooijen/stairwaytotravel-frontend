import { FetchExploreDestinations } from 'components/fetching'

const fetchNearbyPlaces = () => {
  // TODO: replace with backend nearby places api call
  return FetchExploreDestinations(4567, 5, 0)
}

export default fetchNearbyPlaces
