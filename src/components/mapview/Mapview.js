import React, { Component, Fragment } from 'react'

import GoogleMap from './components/GoogleMap'
import DestinationPin from './components/DestinationPin'
import SearchBox from '../../components/SearchBox'
import SimpleSelect from '../../components/SearchBox2'

const LOS_ANGELES_CENTER = [34.0522, -118.2437]

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
      const index = state.places.findIndex(e => e.id === key)
      state.places[index].show = !state.places[index].show // eslint-disable-line no-param-reassign
      return { places: state.places }
    })
  }

  _onBoundsChange = (center, zoom, bounds, marginBounds) => {
    // this.props.onCenterChange(center)
    // this.props.onZoomChange(zoom)
    // console.log('center', center)
    // console.log('zoom', zoom)
    console.log('bounds', bounds)
    this.setState({ bounds: bounds })
    // console.log('marginBounds', marginBounds)
  }

  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state
    const { placeQuery, savePlaceQuery } = this.props

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
          defaultZoom={10}
          defaultCenter={LOS_ANGELES_CENTER}
          // center={
          //   (placeQuery === '') | (placeQuery === undefined)
          //     ? LOS_ANGELES_CENTER
          //     : placeQuery.geometry.viewport.getCenter()
          // }
          // onChildClick={this.onChildClickCallback}
          // onBoundsChange={this._onBoundsChange}
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
