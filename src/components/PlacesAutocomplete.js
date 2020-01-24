import React from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '', googleMapsReady: false }
  }

  componentDidMount() {
    //   script is loaded here and state is set to true after loading
    this.loadGoogleMaps(() => {
      // Work to do after the library loads.
      this.setState({ googleMapsReady: true })
    })
  }

  componentWillUnmount() {
    // unload script when needed to avoid multiple google scripts loaded warning
    this.unloadGoogleMaps()
  }

  loadGoogleMaps = callback => {
    const existingScript = document.getElementById('googlePlacesScript')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        process.env.REACT_APP_MAP_KEY +
        '&libraries=places'
      script.id = 'googleMaps'
      document.body.appendChild(script)
      //action to do after a script is loaded in our case setState
      script.onload = () => {
        if (callback) callback()
      }
    }
    if (existingScript && callback) callback()
  }

  unloadGoogleMaps = () => {
    let googlePlacesScript = document.getElementById('googlePlacesScript')
    if (googlePlacesScript) {
      googlePlacesScript.remove()
    }
  }

  handleChange = address => {
    this.setState({ address })
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  searchOptions = {
    types: ['(regions)'],
  }

  render() {
    if (!this.state.googleMapsReady) {
      return <p>Loading</p>
    }
    return (
      // do something you needed when script is loaded
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={this.searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}

export default LocationSearchInput
