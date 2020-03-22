import { isEmpty } from '../../utils'

const fitMapToBounds = (map, bounds) => {
  if (isEmpty(bounds)) return
  else {
    const mapBounds = new window.google.maps.LatLngBounds()
    const ne = new window.google.maps.LatLng(bounds.ne)
    const sw = new window.google.maps.LatLng(bounds.sw)
    mapBounds.extend(ne)
    mapBounds.extend(sw)
    // 0 for no padding! otherwise padding is added to the map bounds
    map.fitBounds(mapBounds, 0)
  }
}

export default fitMapToBounds
