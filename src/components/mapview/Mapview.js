import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import GoogleMap from './components/GoogleMap'
import DestinationPin from './components/DestinationPin'

const AMSTERDAM_CENTER = [52.3667, 4.8945]

const styles = theme => ({
  wrapper: {
    // This is a hard requirement for GoogleMapReact to display. Don't change!
    width: '100%',
    height: '100vh',
  },
})

function createMapOptions() {
  return {
    gestureHandling: 'greedy', // Will capture all touch events on the map towards map panning
  }
}

// to replace lodash.isEmpty import
function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

class Mapview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showPlace: null,
      center: AMSTERDAM_CENTER,
    }
  }

  // Check for state changes in PlaceQuery to update map
  // TODO: check with Leon if there is a better way of doing this to separate this logic from SearchBox
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.placeQuery !== this.props.placeQuery) {
      this.handlePlaceUpdateMap(this.props.placeQuery, this.props.mapInstance)
    }
    // This focusses the map on placeQuery when it is loaded again
    if (prevProps.mapInstance !== this.props.mapInstance) {
      this.handleBoundsUpdateMap(this.props.mapBounds, this.props.mapInstance)
    }
  }

  handleBoundsUpdateMap(bounds, map) {
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

  // Update map viewport
  handlePlaceUpdateMap(place, map) {
    if (!place.geometry) return
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport)
    } else {
      map.setCenter(place.geometry.location)
      map.setZoom(17)
    }
  }

  // onChildClick callback can take two arguments: key and childProps
  onChildClickCallback = key => {
    const id = Number(key)

    // Center map op new chosen destination
    const place = this.props.places.find(place => place.id === id)
    this.setState({ center: [place.lat, place.lng] })

    // set state on which place to show destination window for
    this.setState(state => {
      id === state.showPlace ? (state.showPlace = null) : (state.showPlace = id)
      return { showPlace: state.showPlace }
    })
  }

  // On click remove destinationWindow
  _onClick = () => {
    this.setState({ showPlace: null })
  }

  _onChange = (viewport, { handleOnChange } = this.props) => {
    // Avoid closing the destination window after onChildClickBack
    // do this by checking if new location is NOT equal to the chosen center
    // TODO: check with Leon if this can be done differently
    if (
      (Math.round(viewport.center.lat * 100) !==
        Math.round(this.state.center[0] * 100)) |
      (Math.round(viewport.center.lng * 100) !==
        Math.round(this.state.center[1] * 100))
    ) {
      this.setState({ showPlace: null })
      // Update bounds and pass on to state of Explore component
      const newBounds = {
        ne: viewport.bounds.ne,
        sw: viewport.bounds.sw,
      }
      handleOnChange(newBounds)
    }
  }

  render() {
    const { classes, places, toggleLike, apiHasLoaded } = this.props

    return (
      <div className={classes.wrapper}>
        <GoogleMap
          options={createMapOptions}
          center={this.state.center}
          onChildClick={this.onChildClickCallback}
          onChange={this._onChange}
          onClick={this._onClick}
          onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        >
          {!isEmpty(places) &&
            places.map(place => (
              <DestinationPin
                // this is required to handle clicks
                key={place.id}
                // these are required by google map to plot
                lat={place.lat}
                lng={place.lng}
                // these are passed along to destinationPin
                show={place.id === this.state.showPlace ? true : false}
                // place is the object containing all the destination stuff
                place={place}
                toggleLike={toggleLike}
              />
            ))}
        </GoogleMap>
      </div>
    )
  }
}

export default withStyles(styles)(Mapview)
