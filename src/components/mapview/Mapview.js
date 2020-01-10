import React, { Component, Fragment } from 'react'

import GoogleMap from './components/GoogleMap'
import DestinationPin from './components/DestinationPin'
// import SearchBox from '../../components/SearchBox'
// import SimpleSelect from '../../components/SearchBox2'
// import { fitBounds } from 'google-map-react/utils'

const LOS_ANGELES_CENTER = [34.0522, -118.2437]

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
      places: [],
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

  componentDidMount() {
    console.log('mount map')
    fetch('places.json')
      .then(response => response.json())
      .then(data => {
        data.results.forEach(result => {
          result.show = false // eslint-disable-line no-param-reassign
        })
        this.setState({ places: data.results })
      })
  }

  // onChildClick callback can take two arguments: key and childProps
  onChildClickCallback = key => {
    this.setState(state => {
      // get index for the one that is already open
      const indexAlreadyOpen = state.places.findIndex(e => e.show === true)
      // get index for the one that was clicked, and change state
      const index = state.places.findIndex(e => e.id === key)
      state.places[index].show = !state.places[index].show
      // close the already open if exists
      if (indexAlreadyOpen !== -1 && indexAlreadyOpen !== index) {
        state.places[indexAlreadyOpen].show = !state.places[indexAlreadyOpen]
          .show
      }
      return { places: state.places }
    })
  }

  _onChange = (center, zoom, bounds, marginBounds) => {
    // this.props.onCenterChange(center)
    // this.props.onZoomChange(zoom)
    // console.log('center', center)
    // console.log('zoom', zoom)
    console.log('bounds', bounds)
    this.setState({ bounds: bounds })
    // console.log('marginBounds', marginBounds)
  }

  render() {
    const { places } = this.state
    // const { places, mapApiLoaded, mapInstance, mapApi } = this.state
    const {
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
          defaultZoom={10}
          center={
            (placeQuery === '') | (placeQuery === undefined)
              ? LOS_ANGELES_CENTER
              : placeQuery.geometry.viewport.getCenter().toJSON()
          }
          // TODO: how to extract zoom from geometry viewport? Prerably use map.fitbounds()
          // zoom={zoom}
          onChildClick={this.onChildClickCallback}
          onChange={this._onChange}
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
                key={place.id}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                show={place.show}
                place={place}
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

// <Marker
//   key={place.id}
//   text={place.name}
//   lat={place.geometry.location.lat()}
//   lng={place.geometry.location.lng()}
// />
