import React, { Component, Fragment } from 'react'

import GoogleMap from './components/GoogleMap'
import DestinationPin from './components/DestinationPin'
// import SearchBox from '../../components/SearchBox'
// import SimpleSelect from '../../components/SearchBox2'
// import { fitBounds } from 'google-map-react/utils'

const AMSTERDAM_CENTER = [52.3667, 4.8945]

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
      bounds: [],
      // for the searchbox
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
    }
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    })
  }

  // onChildClick callback can take two arguments: key and childProps
  onChildClickCallback = key => {
    // set state on which place to show
    this.setState(state => {
      const id = Number(key)
      id === state.showPlace ? (state.showPlace = null) : (state.showPlace = id)
      return { showPlace: state.showPlace }
    })

    // TODO: center map op new chosen destination
    // this.setState(center: {place}.geometry.viewport.getCenter().toJSON())
  }

  // On click remove destinationWindow
  _onClick = () => {
    // this.setState({ showPlace: null })
  }

  _onChange = (center, zoom, bounds, marginBounds) => {
    // this.props.onCenterChange(center)
    // this.props.onZoomChange(zoom)
    // console.log('center', center)
    // console.log('zoom', zoom)
    console.log('bounds', bounds)
    this.setState({ bounds: bounds })
    // console.log('marginBounds', marginBounds)
    // close destination window if opened
    this.setState({ showPlace: null })
  }

  render() {
    // const { places, mapApiLoaded, mapInstance, mapApi } = this.state
    const {
      places,
      toggleLike,
      placeQuery,
      // savePlaceQuery,
      // mapApiLoaded,
      // mapInstance,
      // mapApi,
      // apiHasLoaded,
    } = this.props
    // const { center, zoom } = {(placeQuery === undefined) ? LOS_ANGELES_CENTER, 10 :fitBounds(placeQuery.geometry.viewport)}

    return (
      <Fragment>
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
        <GoogleMap
          options={createMapOptions}
          // TODO: how to re-use the same map component that was preloaded on Home page?
          // map={mapInstance}
          // maps={mapApi}
          defaultZoom={1}
          // TODO: change center either on new placeQuery or on ChildClick
          center={
            (placeQuery === '') | (placeQuery === undefined)
              ? this.state.center
              : placeQuery.geometry.viewport.getCenter().toJSON()
          }
          // TODO: how to extract zoom from geometry viewport? Prerably use map.fitbounds()
          // zoom={zoom}
          onChildClick={this.onChildClickCallback}
          onChange={this._onChange}
          // TODO: close destination window when clicked on map, but keep when click on child
          onClick={this._onClick}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_MAP_KEY,
            libraries: ['places', 'geometry'],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
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
      </Fragment>
    )
  }
}

export default Mapview
