const extractBoundsFromPlaceObject = googlePlaceObject => {
  const viewport = googlePlaceObject.geometry.viewport
  return {
    ne: {
      lat: viewport.getNorthEast().lat(),
      lng: viewport.getNorthEast().lng(),
    },
    sw: {
      lat: viewport.getSouthWest().lat(),
      lng: viewport.getSouthWest().lng(),
    },
  }
}

export default extractBoundsFromPlaceObject
