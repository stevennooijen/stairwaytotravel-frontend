import React from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import debounce from 'lodash.debounce'

import { withStyles } from '@material-ui/core/styles'
import RefreshIcon from '@material-ui/icons/Refresh'

import Album from 'components/Album'
import AlbumItem from 'components/AlbumItem'
import DestinationCard from 'components/destinationCard/DestinationCard'
import GetFlickrImages from 'components/destinationCard/GetFlickrImages'
import TopAppBar from '../../components/TopAppBar'
import ResultsBar from '../../components/ResultsBar'
import ConsecutiveSnackbars from 'components/ConsecutiveSnackbars'
import { Mapview } from '../../components/mapview'
import SearchBox from '../../components/SearchBox'
import GoogleMap from '../../components/mapview/components/GoogleMap'
import MapFloatingActionButton from '../../components/mapview/components/MapFloatingActionButton'
import NothingFoundCard from './components/NothingFoundCard'
import Loader from 'components/fetching/Loader'
import FetchExploreDestinations from '../../components/fetching/FetchExploreDestinations'
import {
  fitMapToPlace,
  fitMapToBounds,
  extractBoundsFromPlaceObject,
  extractCountryFromPlaceObject,
} from '../../components/mapview/utils'
import { pushUrlWithQueryParams, updateListItem } from 'components/utils'

const styles = theme => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  // in order to position MapFloatingActionButton in middle of mapview
  mapContainer: {
    flexGrow: 1,
  },
  // gridItem: {
  //   padding: theme.spacing(1),
  // },
})

class Explore extends React.Component {
  _isMounted = false

  constructor(props) {
    super(props)

    this.state = {
      // state for infinte scroll
      maxPlacesText: '',
      error: false,
      hasMore: true,
      isLoading: false,

      // state for query
      nResults: 12,
      offset: 0,
      queryParams: queryString.parse(this.props.location.search),
      mapBounds: null,
      country: null,
      searchInput: null,

      // state to keep places and interactions
      destinationList: [],

      // state for mapview
      showMap: false,
      showSearchHere: false,
      // Google mapInstance object
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,

      // state for like/dislike snackbar message
      snackbarMessage: null,
      snackbarPlaceId: null,
    }

    // Binds our scroll event handler
    window.onscroll = debounce(() => {
      const {
        state: { error, isLoading, hasMore },
      } = this

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 72
      ) {
        this.fetchDestinations(
          this.props.seed,
          this.state.nResults,
          this.state.offset,
          this.state.mapBounds,
          this.state.country,
        )
      }
    }, 100)
  }

  // Pipeline of functions. Result of previous is piped into next function
  componentDidMount() {
    this._isMounted = true

    // Set defaults based on query string parameters
    if (this.state.queryParams.map === 'true') this.setState({ showMap: true })

    // Fetch last query params from Root, if none fetch at random.
    let mapBounds
    let country
    if (this.props.placeQuery) {
      mapBounds = extractBoundsFromPlaceObject(this.props.placeQuery)
      country = extractCountryFromPlaceObject(this.props.placeQuery)
    } else if (this.props.mapQuery) {
      mapBounds = this.props.mapQuery
      country = null
      this.setState({ searchInput: 'Selected map area' })
    } else {
      mapBounds = null
      country = null
    }

    this.setState({
      mapBounds: mapBounds,
      country: country,
    })

    // const itemList = JSON.parse(sessionStorage.getItem('destinationList'))
    const itemList = null

    if (itemList === null) {
      this.fetchDestinations(
        this.props.seed,
        this.state.nResults,
        this.state.offset,
        mapBounds,
        country,
      )
    } else {
      this.setState({ destinationList: itemList })
    }
  }

  // Check for state changes in PlaceQuery to update map
  // TODO: check with Leon if there is a better way of doing this to separate this logic from SearchBox
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.placeQuery !== this.props.placeQuery) {
      fitMapToPlace(this.state.mapInstance, this.props.placeQuery)
    }
    // This focusses the map on placeQuery when it is loaded again
    if (prevState.mapInstance !== this.state.mapInstance) {
      fitMapToBounds(this.state.mapInstance, this.state.mapBounds)
    }
    // Update state if history changes (browser back / forward button)
    if (prevProps.location !== this.props.location) {
      this.setState({
        showMap: queryString.parse(this.props.location.search).map === 'true',
      })
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    })
  }

  fetchDestinations(seed, nResults, offset, bounds, country) {
    if (this._isMounted) {
      this.setState({ isLoading: true, offset: offset + nResults }, () => {
        FetchExploreDestinations(seed, nResults, offset, bounds, country)
          .then(response => response.json())
          .then(data => {
            // retrieve maximum number of places possible
            if (this._isMounted) {
              this.setState({ maxPlacesText: data.maxPlacesText })
            }
            const maxPlaces = data.maxPlaces

            // check if new places are fetched
            data.destinations.length > 0
              ? // for each of the fetched destinations in the list do:
                data.destinations.forEach(item => {
                  // 1. retrieve flickr Images
                  GetFlickrImages(item.name + ' ' + item.country)
                    .then(imageUrls => {
                      return {
                        ...item,
                        images: imageUrls,
                      }
                    })
                    // 2. set liked to true if destination already in likedList
                    .then(item => {
                      if (this.props.likedPlaces.includes(item.id)) {
                        return {
                          ...item,
                          liked: true,
                        }
                      } else {
                        return item
                      }
                    })
                    // 3. save fetched destination to state
                    .then(item => {
                      if (this._isMounted) {
                        this.setState({
                          destinationList: [
                            ...this.state.destinationList,
                            item,
                          ],
                          hasMore:
                            this.state.destinationList.length < maxPlaces,
                          isLoading: false,
                        })
                      }
                    })
                })
              : this.setState({
                  hasMore: false,
                  isLoading: false,
                })
          })
          .catch(err => {
            // console.log(err)
            this.setState({
              error: err.message,
              isLoading: false,
            })
          })
      })
    }
  }

  toggleLike(id) {
    this.updateDestinationList(id)
    this.updateLikedPlaces(id)
    this.updateNewLikes(id)
    this.updateSnackbarMessage(id)
  }

  updateDestinationList(id) {
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
    // sessionStorage.setItem('destinationList', JSON.stringify(newList))
  }

  updateLikedPlaces(id) {
    this.props.setRootState(
      'likedPlaces',
      updateListItem(this.props.likedPlaces, id),
    )
  }

  updateNewLikes(id) {
    this.props.setRootState('newLikes', updateListItem(this.props.newLikes, id))
  }

  updateSnackbarMessage(id) {
    this.setState(
      {
        snackbarMessage: this.props.likedPlaces.includes(id)
          ? 'Removed from your bucket list'
          : 'Saved to your bucket list',
        snackbarPlaceId: id,
      },
      () => this.setState({ snackbarMessage: null }),
    )
  }

  toggleShowMap() {
    this.setState({ showMap: !this.state.showMap })
    window.scrollTo(0, 0)
    // Update query string in url
    const newQueryParams = this.state.queryParams
    newQueryParams.map = !this.state.showMap
    pushUrlWithQueryParams(newQueryParams, this.props)
  }

  render() {
    const { seed, placeQuery, setRootState, setNewSeed, classes } = this.props
    const {
      destinationList,
      maxPlacesText,
      nResults,
      mapApiLoaded,
      mapInstance,
      mapApi,
    } = this.state

    // only show places with at least one image
    const placesWithImages = destinationList.filter(
      place => place.images.length > 0,
    )
    // subtract number of places without images from the total number reported
    const maxPlaces =
      maxPlacesText[maxPlacesText.length - 1] === '+'
        ? maxPlacesText
        : maxPlacesText * 1 -
          destinationList.filter(place => place.images.length === 0).length

    return (
      <div>
        {/* Show map or show stream */}
        {this.state.showMap ? (
          // Map - in this case the searchBox uses the same mapInstance as the map itself
          <div className={classes.body}>
            <TopAppBar
              showMap={this.state.showMap}
              toggleShowMap={() => this.toggleShowMap()}
            >
              {/* TODO: see how this can be decoupled from the same mapInstance as the mapview uses */}
              {mapApiLoaded && (
                <SearchBox
                  map={mapInstance}
                  mapApi={mapApi}
                  placeQuery={placeQuery}
                  searchInput={this.state.searchInput}
                  handlePlaceChange={place => {
                    // Update root state
                    setRootState('mapQuery', null)
                    setRootState('placeQuery', place)
                    const newSeed = setNewSeed()
                    // extract bounds
                    const bounds = extractBoundsFromPlaceObject(place)
                    // check if PlaceQuery is a country
                    const country = extractCountryFromPlaceObject(place)
                    // New query, so reset destinationList and offset
                    this.setState(
                      {
                        offset: 0,
                        destinationList: [],
                        searchInput: null,
                        mapBounds: bounds,
                        country: country,
                      },
                      () =>
                        this.fetchDestinations(
                          newSeed,
                          nResults,
                          0,
                          bounds,
                          country,
                        ),
                    )
                    // Map centering is triggered by change in placeQuery state in Mapview component
                  }}
                />
              )}
            </TopAppBar>
            {this.state.showSearchHere && (
              <MapFloatingActionButton
                onClick={() => {
                  // Update root state
                  setRootState('mapQuery', this.state.mapBounds)
                  setRootState('placeQuery', '')
                  const newSeed = setNewSeed()
                  // New query, so reset destinationList and offset
                  this.setState(
                    {
                      showSearchHere: false,
                      offset: 0,
                      destinationList: [],
                      searchInput: 'Selected map area',
                      country: null,
                    },
                    () =>
                      this.fetchDestinations(
                        newSeed,
                        nResults,
                        0,
                        this.state.mapBounds,
                        null,
                      ),
                  )
                }}
              >
                <RefreshIcon className={classes.extendedIcon} />
                Search here
              </MapFloatingActionButton>
            )}
            <div className={classes.mapContainer}>
              <Mapview
                // Create Google mapInstance object in Mapview and save in Explore state
                apiHasLoaded={(map, maps) => this.apiHasLoaded(map, maps)}
                // Pass on other stuff
                handleOnChange={newBounds => {
                  this.setState({ mapBounds: newBounds, showSearchHere: true })
                }}
                places={placesWithImages.slice(0, nResults)}
                toggleLike={id => this.toggleLike(id)}
                history={this.props.history}
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
            <TopAppBar
              showMap={this.state.showMap}
              toggleShowMap={() => this.toggleShowMap()}
            >
              {/* TODO: load API before already in list view. Cannot wait till map is loaded! */}
              {mapApiLoaded && (
                <SearchBox
                  map={mapInstance}
                  mapApi={mapApi}
                  placeQuery={placeQuery}
                  searchInput={this.state.searchInput}
                  handlePlaceChange={place => {
                    // Update root state
                    setRootState('mapQuery', null)
                    setRootState('placeQuery', place)
                    const newSeed = setNewSeed()
                    // extract bounds
                    const bounds = extractBoundsFromPlaceObject(place)
                    // check if PlaceQuery is a country
                    const country = extractCountryFromPlaceObject(place)
                    // New query, so reset destinationList and offset
                    this.setState(
                      {
                        offset: 0,
                        destinationList: [],
                        searchInput: null,
                        mapBounds: bounds,
                        country: country,
                      },
                      () =>
                        this.fetchDestinations(
                          newSeed,
                          nResults,
                          0,
                          bounds,
                          country,
                        ),
                    )
                    // make sure scroll is positioned on top
                    window.scrollTo(0, 0)
                  }}
                />
              )}
            </TopAppBar>
            {!this.state.isLoading && (
              <ResultsBar
                text={
                  maxPlaces +
                  (maxPlaces === 1 ? ' place' : ' places') +
                  ' to explore'
                }
              />
            )}
            <Album>
              {placesWithImages.map(place => (
                // Grid en DestinationCard zijn "domme" componenten die zelf geen state bijhouden en alleen UI doen
                // State blijft zodoende in de Bucketlist component op 'hoog' niveau
                <AlbumItem key={place.id}>
                  <DestinationCard
                    place={place}
                    toggleLike={id => this.toggleLike(id)}
                    onClick={() => {
                      // send to destination page
                      this.props.history.push('/explore/' + place.id)
                    }}
                  />
                </AlbumItem>
              ))}
              {this.state.maxPlacesText === 0 && <NothingFoundCard />}
            </Album>
            {this.state.isLoading && <Loader />}
            <ConsecutiveSnackbars
              snackbarMessage={this.state.snackbarMessage}
              handleUndo={() => this.toggleLike(this.state.snackbarPlaceId)}
            />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Explore))
