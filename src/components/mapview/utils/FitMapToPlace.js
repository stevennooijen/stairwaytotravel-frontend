// Update map viewport
const fitMapToPlace = (map, place) => {
  if (!place.geometry) return
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport)
  } else {
    map.setCenter(place.geometry.location)
    map.setZoom(17)
  }
}

export default fitMapToPlace
