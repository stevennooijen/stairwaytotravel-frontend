import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import GoogleMap from './components/GoogleMap'
import DestinationPin from './components/DestinationPin'

const AMSTERDAM_CENTER = [52.3667, 4.8945]

const styles = theme => ({
  wrapper: {
    // This is a hard requirement for GoogleMapReact to display. Don't change!
    height: '100%',
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
