import { getMapBounds, bindResizeListener } from 'components/mapview/utils'

const MINIMUM_ZOOM = 8
// in case of empty destination list
const AMSTERDAM_CENTER = [52.3667, 4.8945]
const DEFAULT_ZOOM = 1

// Fit map to its bounds after the api is loaded
const fitMapToPlaces = (map, maps, places) => {
  if (places !== null && places.length > 0) {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places)
    // Fit map to bounds
    map.fitBounds(bounds)
    // Enforce minimal zoom level
    const zoom = map.getZoom()
    map.setZoom(zoom > MINIMUM_ZOOM ? MINIMUM_ZOOM : zoom)
    // Bind the resize listener
    bindResizeListener(map, maps, bounds)
  } else {
    map.setZoom(DEFAULT_ZOOM)
    map.setCenter(AMSTERDAM_CENTER)
  }
}

export default fitMapToPlaces
