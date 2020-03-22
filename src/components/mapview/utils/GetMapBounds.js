// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds()

  places.forEach(place => {
    bounds.extend(
      // new maps.LatLng(place.geometry.location.lat, place.geometry.location.lng),
      new maps.LatLng(place.lat, place.lng),
    )
  })
  return bounds
}

export default getMapBounds
