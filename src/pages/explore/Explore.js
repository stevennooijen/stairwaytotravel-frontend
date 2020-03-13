import React from 'react'
import { withRouter } from 'react-router-dom'

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
  // in order to position searchHereButton in middle of mapview
  mapview: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
})

class Explore extends React.Component {
  // _isMounted = false

  constructor(props) {
    super(props)

    this.state = {
      // state for query
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

      showMap: false,
      showSearchHere: false,
      // Google mapInstance object
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

  toggleShowMap() {
    this.setState({ showMap: !this.state.showMap })
    window.scrollTo(0, 0)
  }

  render() {
    const { classes, placeQuery, savePlaceQuery } = this.props
    const { mapApiLoaded, mapInstance, mapApi } = this.state

    return (
      <main>
        {/* Show map or show stream */}
        {this.state.showMap ? (
          // Map - in this case the searchBox uses the same mapInstance as the map itself
          <React.Fragment>
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
            <div className={classes.mapview}>
              {this.state.showSearchHere ? (
                <SearchHereButton
                  onClick={() => {
                    this.setState({ showSearchHere: false })
                    this.fetchDestinations(this.state.mapBounds)
                  }}
                />
              ) : null}
              <Mapview
                // Create Google mapInstance object in Mapview and save in Explore state
                apiHasLoaded={(map, maps) => this.apiHasLoaded(map, maps)}
                // Pass on other stuff
                mapInstance={mapInstance}
                handleOnChange={newBounds => {
                  this.handleBoundsChange(newBounds)
                  this.setState({ showSearchHere: true })
                }}
                placeQuery={placeQuery}
                places={this.state.destinationList}
                toggleLike={id => {
                  this.toggleLike(id)
                  this.updateLikedDestinationsList(id)
                }}
              />
              }
            </div>
          </React.Fragment>
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
      </main>
    )
  }
}

export default withRouter(withStyles(styles)(Explore))
