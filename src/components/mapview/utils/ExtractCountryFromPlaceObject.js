const extractCountryFromPlaceObject = googlePlaceObject => {
  const country = googlePlaceObject.types.includes('country')
    ? googlePlaceObject.formatted_address
    : null
  return country
}

export default extractCountryFromPlaceObject
