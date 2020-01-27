import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'

import Album from 'components/Album'
import DestinationCard from 'components/destinationCard/DestinationCard'
import GetFlickrImage from 'components/destinationCard/GetFlickrImage'
import ExploreBar from './components/ExploreBar'
import { Mapview } from '../../components/mapview'
import SearchBox from '../../components/SearchBox'

const styles = theme => ({
  loaderContainer: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
  },
})

class Explore extends React.Component {
  // _isMounted = false

  constructor(props) {
    super(props)

    this.state = {
      continent: sessionStorage.getItem('continent'),
      // For testing purposes, could use ExampleList from Constants
      // destinationList: ExampleList,
      destinationList: [],
      placeQuery: '',

      showMap: false,
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

  savePlaceQuery = place => {
    this.setState({ placeQuery: place })
    // this.setState({ placeQuery: place.target.value })
    // TODO: remove, is inserted for demo purposes
    // console.log('global center', place.geometry.viewport.getCenter())
    // console.log('this', this.state.placeQuery.formatted_address)
  }

  // Pipeline of functions. Result of previous is piped into next function
  componentDidMount() {
    // this._isMounted = true
    const itemList = JSON.parse(sessionStorage.getItem('destinationList'))

    if (itemList === null) {
      // First fetch the list of recommended destinations
      this.fetchDestinations()
        .then(response => response.json())
        // Then save this to State to start rendering the cards
        .then(data => {
          const destinationList = data.Destinations
          this.setState(oldState => ({
            ...oldState,
            destinationList,
          }))

          return destinationList
        })
        // Then for each destination create promise to fetch an image and set State if resolved
        .then(destinationList => {
          destinationList.forEach(item => {
            this.fetchImage(item.name)
          })
        })
        .catch(err => console.log(err))
    } else {
      this.setState({ destinationList: itemList })
    }
  }

  // Query based on destination name + country_name + (possibly activity filter?) + (geolocation?)
  fetchImage(destinationName) {
    // Create promise and setState when resolved through the callback `.then()`
    GetFlickrImage(destinationName).then(imageUrl => {
      this.setState(oldState => ({
        // Posssibly improve this by using a Map type (like a dict) instead of looping over an array
        // You could then access each item directly: destionationList[i]
        destinationList: oldState.destinationList.map(item => {
          if (item.name === destinationName) {
            return {
              ...item,
              image: imageUrl,
            }
          } else {
            return item
          }
        }),
      }))
    })
  }

  // Call an API, API_URL is retrieved from .env files
  fetchDestinations() {
    // return search as requested by sessionStorage (=Search tab)
    if (this.state.continent) {
      return fetch(
        process.env.REACT_APP_API_URL +
          '/api/explore/?continent=' +
          sessionStorage.getItem('continent'),
      )
      // return random destination
    } else {
      return fetch(process.env.REACT_APP_API_URL + '/api/explore')
    }
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

    // hier: api call naar backend. dat wanneer je de pagina refresht en vraagt wat de gelikedte kaarten zijn dat alles weer teurg komt.
    // beetje state in de front-end en dan veel state in de backend!

    // Hier: Apart lijstje van likes wegschijven naar session/localStorage
    // Bij like data kopieren van de een naar de lijst met likes. en een update naar de backend
    sessionStorage.setItem('destinationList', JSON.stringify(newList))
  }

  toggleShowMap() {
    this.setState({ showMap: !this.state.showMap })
  }

  // Check for state changes in PlaceQuery
  // TODO: check with Leon if there is a better way of doing this to separate this logic from SearchBox
  componentDidUpdate(prevProps, prevState) {
    if (prevState.placeQuery !== this.state.placeQuery) {
      this.handleUpdateMap(this.state.placeQuery, this.state.mapInstance)
    }
  }

  // Update map viewport
  handleUpdateMap(place, map) {
    if (!place.geometry) return
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport)
    } else {
      map.setCenter(place.geometry.location)
      map.setZoom(17)
    }
  }

  render() {
    const { classes } = this.props
    const { placeQuery, mapApiLoaded, mapInstance, mapApi } = this.state

    return (
      <main>
        <ExploreBar
          showMap={this.state.showMap}
          toggleShowMap={() => this.toggleShowMap()}
        >
          {/* TODO: load API before already in list view. Cannot wait till map is loaded! */}
          {mapApiLoaded && (
            <SearchBox
              map={mapInstance}
              mapApi={mapApi}
              placename={placeQuery}
              handlePlaceChange={this.savePlaceQuery}
              // Map centering is triggered by change in placeQuery state
            />
          )}
        </ExploreBar>
        {/* Show map or show stream */}
        {this.state.showMap ? (
          // Map
          <Mapview
            // Create Google mapInstance object in Mapview and save in Explore state
            apiHasLoaded={(map, maps) => this.apiHasLoaded(map, maps)}
            // Pass on other state
            places={this.state.destinationList}
            toggleLike={id => this.toggleLike(id)}
          />
        ) : (
          // Stream
          <React.Fragment>
            {/* check if destinations are loaded, if not display progress */}
            {this.state.destinationList && this.state.destinationList.length ? (
              <Album>
                {this.state.destinationList.map(place => (
                  // Grid en DestinationCard zijn "domme" componenten die zelf geen state bijhouden en alleen UI doen
                  // State blijft zodoende in de Bucketlist component op 'hoog' niveau
                  <Grid item key={place.id} xs={12} sm={6} md={4} lg={3}>
                    <DestinationCard
                      place={place}
                      toggleLike={id => this.toggleLike(id)}
                      onClick={() => {
                        // send to destination page
                        this.props.history.push('/explore/' + place.id)
                      }}
                    />
                  </Grid>
                ))}
              </Album>
            ) : (
              //  show Indeterminate progress indicator while waiting for destinations to load
              <Container className={classes.loaderContainer}>
                {/* <LinearProgress /> */}
                <CircularProgress />
              </Container>
            )}
          </React.Fragment>
        )}
      </main>
    )
  }
}

export default withRouter(withStyles(styles)(Explore))
