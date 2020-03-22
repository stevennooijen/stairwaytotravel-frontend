import React from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'

import Album from 'components/Album'
import DestinationCard from 'components/destinationCard/DestinationCard'
import GetFlickrImages from 'components/destinationCard/GetFlickrImages'
import ExploreBar from './components/ExploreBar'
import { Mapview } from '../../components/mapview'
import SearchBox from '../../components/SearchBox'
import GoogleMap from '../../components/mapview/components/GoogleMap'
import SearchHereButton from '../../components/mapview/components/SeachHereButton'
import NothingFoundCard from './components/NothingFoundCard'
import FetchExploreDestinations from '../../components/fetching/FetchExploreDestinations'

const styles = theme => ({
  loaderContainer: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  // in order to position searchHereButton in middle of mapview
  mapContainer: {
    flexGrow: 1,
  },
})

// to replace lodash.isEmpty import
function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

const handleBoundsUpdateMap = (map, bounds) => {
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
const handlePlaceUpdateMap = (map, place) => {
  if (!place.geometry) return
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport)
  } else {
    map.setCenter(place.geometry.location)
    map.setZoom(17)
  }
}

class Explore extends React.Component {
  // _isMounted = false

  constructor(props) {
    super(props)

    this.state = {
      // state for query
      queryParams: queryString.parse(this.props.location.search),
      // continent: sessionStorage.getItem('continent'),
      mapBounds: {},
      // For testing purposes, could use ExampleList from Constants
      // destinationList: ExampleList,
      loading: true,
      destinationsFound: true,
      destinationList: [],
      likedDestinations: JSON.parse(
        sessionStorage.getItem('likedDestinations'),
      ),
      newLikes: [],

      showMap: false,
      showSearchHere: false,
      // Google mapInstance object
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
    }
  }

  // Check for state changes in PlaceQuery to update map
  // TODO: check with Leon if there is a better way of doing this to separate this logic from SearchBox
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.placeQuery !== this.props.placeQuery) {
      handlePlaceUpdateMap(this.state.mapInstance, this.props.placeQuery)
    }
    // This focusses the map on placeQuery when it is loaded again
    if (prevState.mapInstance !== this.state.mapInstance) {
      handleBoundsUpdateMap(this.state.mapInstance, this.state.mapBounds)
    }
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    })
  }

  handleBoundsChange = newBounds => {
    this.setState({ mapBounds: newBounds })
  }

  extractBoundsFromPlaceObject = googlePlaceObject => {
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

  // Pipeline of functions. Result of previous is piped into next function
  componentDidMount() {
    // Set defaults based on query string parameters
    if (this.state.queryParams.map === 'true') this.setState({ showMap: true })

    // If no already liked destinations, set to empty array
    if (this.state.likedDestinations === null)
      this.setState({ likedDestinations: [] })

    // retrieve bounds from PlaceQuery
    const bounds = this.props.placeQuery
      ? this.extractBoundsFromPlaceObject(this.props.placeQuery)
      : null
    if (bounds) {
      this.handleBoundsChange(bounds)
    }

    // const itemList = JSON.parse(sessionStorage.getItem('destinationList'))
    const itemList = null

    if (itemList === null) {
      this.fetchDestinations(bounds)
    } else {
      this.setState({ destinationList: itemList })
    }
  }

  fetchDestinations(bounds) {
    this.setState({ loading: true, destinationList: [] })

    FetchExploreDestinations(bounds)
      .then(response => response.json())
      .then(data => data.Destinations)
      .then(destinationList => {
        destinationList.length > 0
          ? // for each of the fetched destinations in the list do:
            destinationList.forEach(item => {
              // 1. retrieve flickr Images
              GetFlickrImages(item.name)
                .then(imageUrls => {
                  return {
                    ...item,
                    images: imageUrls,
                  }
                })
                // 2. set liked to true if destination already in likedList
                .then(item => {
                  if (this.state.likedDestinations.includes(item.id)) {
                    return {
                      ...item,
                      liked: true,
                    }
                  } else {
                    return item
                  }
                })
                // 3. save fetched destination to state
                .then(item =>
                  this.setState({
                    destinationList: [...this.state.destinationList, item],
                    loading: false,
                    destinationsFound: true,
                  }),
                )
            })
          : this.setState({
              loading: false,
              destinationsFound: false,
            })
      })
      .catch(err => console.log(err))
  }

  toggleLike(id) {
    // https://www.robinwieruch.de/react-state-array-add-update-remove/
    const newList = this.state.destinationList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          liked: !item.liked,
        }
      } else {
        return item
      }
    })

    this.setState({
      destinationList: newList,
    })
    sessionStorage.setItem('destinationList', JSON.stringify(newList))
  }

  updateLikedDestinationsList(id) {
    // For bucketlist page: keep track of likes and save in an array to session storage
    const likedDestinations = this.state.likedDestinations
    const newLikedDestinations = likedDestinations.includes(id)
      ? likedDestinations.filter(item => item !== id)
      : [...likedDestinations, id]
    this.setState({ likedDestinations: newLikedDestinations })
    sessionStorage.setItem(
      'likedDestinations',
      JSON.stringify(newLikedDestinations),
    )
  }

  updateNewLikes(id) {
    // Same as above, can be turned into generic helper function!
    const newLikes = this.state.newLikes
    const newNewLikes = newLikes.includes(id)
      ? newLikes.filter(item => item !== id)
      : [...newLikes, id]
    this.setState({ newLikes: newNewLikes })

    // set newLike for notification dot when there are new likes
    if (newNewLikes.length > 0) {
      this.props.setNewLike(true)
    } else this.props.setNewLike(false)
  }

  toggleShowMap() {
    this.setState({ showMap: !this.state.showMap })
    window.scrollTo(0, 0)
    // Update query string in url
    const newQueryParams = this.state.queryParams
    newQueryParams.map = !this.state.showMap
    this.pushUrlWithQueryParams(newQueryParams)
  }

  pushUrlWithQueryParams(queryParams) {
    this.props.history.push(
      this.props.location.pathname + '?' + queryString.stringify(queryParams),
    )
  }

  render() {
    const { classes, placeQuery, savePlaceQuery } = this.props
    const { mapApiLoaded, mapInstance, mapApi } = this.state

    return (
      <div>
        {/* Show map or show stream */}
        {this.state.showMap ? (
          // Map - in this case the searchBox uses the same mapInstance as the map itself
          <div className={classes.body}>
            <ExploreBar
              showMap={this.state.showMap}
              toggleShowMap={() => this.toggleShowMap()}
            >
              {/* TODO: see how this can be decoupled from the same mapInstance as the mapview uses */}
              {mapApiLoaded && (
                <SearchBox
                  map={mapInstance}
                  mapApi={mapApi}
                  placeName={placeQuery}
                  handlePlaceChange={place => {
                    savePlaceQuery(place)
                    const bounds = this.extractBoundsFromPlaceObject(place)
                    this.handleBoundsChange(bounds)
                    this.fetchDestinations(bounds)
                    // Map centering is triggered by change in placeQuery state in Mapview component
                  }}
                />
              )}
            </ExploreBar>
            {this.state.showSearchHere && (
              <SearchHereButton
                onClick={() => {
                  this.setState({ showSearchHere: false })
                  this.fetchDestinations(this.state.mapBounds)
                }}
              />
            )}
            <div className={classes.mapContainer}>
              <Mapview
                // Create Google mapInstance object in Mapview and save in Explore state
                apiHasLoaded={(map, maps) => this.apiHasLoaded(map, maps)}
                // Pass on other stuff
                handleOnChange={newBounds => {
                  this.handleBoundsChange(newBounds)
                  this.setState({ showSearchHere: true })
                }}
                places={this.state.destinationList}
                toggleLike={id => {
                  this.toggleLike(id)
                  this.updateLikedDestinationsList(id)
                  this.updateNewLikes(id)
                }}
              />
            </div>
          </div>
        ) : (
          // Stream - in this case we create a mapInstance for the searchBox only
          <React.Fragment>
            <GoogleMap
              onGoogleApiLoaded={({ map, maps }) => {
                this.apiHasLoaded(map, maps)
              }}
            />
            <ExploreBar
              showMap={this.state.showMap}
              toggleShowMap={() => this.toggleShowMap()}
            >
              {/* TODO: load API before already in list view. Cannot wait till map is loaded! */}
              {mapApiLoaded && (
                <SearchBox
                  map={mapInstance}
                  mapApi={mapApi}
                  placeName={placeQuery}
                  handlePlaceChange={place => {
                    savePlaceQuery(place)
                    const bounds = this.extractBoundsFromPlaceObject(place)
                    this.handleBoundsChange(bounds)
                    this.fetchDestinations(bounds)
                  }}
                />
              )}
            </ExploreBar>
            {this.state.loading ? (
              //  show Indeterminate progress indicator while waiting for destinations to load
              <Container className={classes.loaderContainer}>
                <CircularProgress />
              </Container>
            ) : this.state.destinationsFound ? (
              // if destinations found
              <Album>
                {this.state.destinationList.map(place => (
                  // Grid en DestinationCard zijn "domme" componenten die zelf geen state bijhouden en alleen UI doen
                  // State blijft zodoende in de Bucketlist component op 'hoog' niveau
                  <Grid item key={place.id} xs={12} sm={6} md={4}>
                    <DestinationCard
                      place={place}
                      toggleLike={id => {
                        this.toggleLike(id)
                        this.updateLikedDestinationsList(id)
                        this.updateNewLikes(id)
                      }}
                      onClick={() => {
                        // send to destination page
                        this.props.history.push('/explore/' + place.id)
                      }}
                    />
                  </Grid>
                ))}
              </Album>
            ) : (
              // if no destinations found
              <Album>
                <NothingFoundCard />
              </Album>
            )}
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Explore))
