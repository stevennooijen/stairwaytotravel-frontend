import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import GoogleMap from './components/GoogleMap'
import DestinationPin from './components/DestinationPin'
import { isEmpty } from '../utils'

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
      // handleOnChange is used to update bounds and pass on to state back to Explore component
      if (handleOnChange) {
        const newBounds = {
          ne: viewport.bounds.ne,
          sw: viewport.bounds.sw,
        }
        handleOnChange(newBounds)
      }
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
