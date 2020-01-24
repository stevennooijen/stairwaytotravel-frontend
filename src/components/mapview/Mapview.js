import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import GoogleMap from './components/GoogleMap'
import DestinationPin from './components/DestinationPin'
// import SearchBox from '../../components/SearchBox'
// import SimpleSelect from '../../components/SearchBox2'
// import { fitBounds } from 'google-map-react/utils'
import SearchHereButton from './components/SeachHereButton'

const AMSTERDAM_CENTER = [52.3667, 4.8945]

const styles = theme => ({
  // in order to position searchHereButton in middle of mapview
  mapview: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
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
      showSearchHere: false,
      showPlace: null,
      center: AMSTERDAM_CENTER,
      bounds: [],
    }
  }

  // onChildClick callback can take two arguments: key and childProps
  onChildClickCallback = key => {
    const id = Number(key)

    // Center map op new chosen destination
    const place = this.props.places.find(place => place.id === id)
    this.setState({ center: [place.latitude, place.longitude] })

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

  _onChange = (center, zoom, bounds, marginBounds) => {
    // Avoid closing the destination window after onChildClickBack
    // do this by checking if new location is NOT equal to the chosen center
    // TODO: check with Leon if this can be done differently
    if (
      (Math.round(center.center.lat * 100) !==
        Math.round(this.state.center[0] * 100)) |
      (Math.round(center.center.lng * 100) !==
        Math.round(this.state.center[1] * 100))
    ) {
      this.setState({ showPlace: null })
      // toggle showSearchHere button if map changed
      this.setState({ showSearchHere: true })
    }
  }

  SearchOnGeo = () => {
    this.setState({ showSearchHere: false })
    // TODO: call fetch to new destinations based on Geo location
  }

  render() {
    // const { places, mapApiLoaded, mapInstance, mapApi } = this.state
    const { classes, places, toggleLike, apiHasLoaded } = this.props

    return (
      <div className={classes.mapview}>
        {/* TODO: replace, is insterted for DEMO purposes */}
        {/* <SimpleSelect value={placename} onChange={addPlace} /> */}
        {/* {mapApiLoaded && (
          <SearchBox
            map={mapInstance}
            mapApi={mapApi}
            addplace={savePlaceQuery}
            placename={placeQuery}
          />
        )} */}
        {this.state.showSearchHere ? (
          <SearchHereButton onClick={this.SearchOnGeo} />
        ) : null}
        <GoogleMap
          options={createMapOptions}
          // TODO: how to re-use the same map component that was preloaded on Home page?
          // map={mapInstance}
          // maps={mapApi}
          defaultZoom={1}
          center={this.state.center}
          // TODO: how to extract zoom from geometry viewport? Prerably use map.fitbounds()
          // zoom={zoom}
          onChildClick={this.onChildClickCallback}
          onChange={this._onChange}
          onClick={this._onClick}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_MAP_KEY,
            libraries: ['places', 'geometry'],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
        >
          {!isEmpty(places) &&
            places.map(place => (
              <DestinationPin
                // this is required to handle clicks
                key={place.id}
                // these are required by google map to plot
                lat={place.latitude}
                lng={place.longitude}
                // these are passed along to destinationPin
                show={place.id === this.state.showPlace ? true : false}
                // place is the object containing all the destination stuff
                place={place}
                toggleLike={toggleLike}
                // onChildMouseEnter={this.onChildMouseEnter}
                // onChildMouseLeave={this.onChildMouseLeave}
                // hover={this.state.hover}
              />
            ))}
        </GoogleMap>
        }
      </div>
    )
  }
}

// export default Mapview
export default withStyles(styles)(Mapview)
