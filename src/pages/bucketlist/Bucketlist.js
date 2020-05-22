import React from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import ReactGA from 'react-ga'

import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import ExploreIcon from '@material-ui/icons/Explore'

import Album from 'components/Album'
import DestinationCard from 'components/destinationCard/DestinationCard'
import ResultsBar from 'components/ResultsBar'
import WarningCard from './WarningCard'
import { fetchSingleDestination } from '../../components/fetching'
import GetFlickrImages from 'components/destinationCard/GetFlickrImages'
import FloatingActionButton from './FloatingActionButton'
import TopAppBar from '../../components/TopAppBar'
import { Mapview } from '../../components/mapview'
import { fitMapToPlaces } from 'components/mapview/utils'
import MapFloatingActionButton from '../../components/mapview/components/MapFloatingActionButton'
import CheckoutDialog from './CheckoutDialog'
import Loader from 'components/fetching/Loader'
import postSignupForm from '../../components/fetching/mailchimp/PostSignupForm'
import postLikesEvent from '../../components/fetching/mailchimp/PostLikesEvent'
import patchSignupFormLikes from '../../components/fetching/mailchimp/PatchSignupFormLikes'
import { pushUrlWithQueryParams, updateListItem } from 'components/utils'

const styles = theme => ({
  pageTitle: {
    width: '100%',
  },
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
})

class Bucketlist extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      destinationList: [],
      queryParams: queryString.parse(this.props.location.search),
      showMap: false,
      dialogOpen: false,
      thanksBarOpen: false,
      isLoading: false,

      // Google mapInstance object
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,

      // checkoutDialog features
      textFieldValue: '',
      flights: false,
      accommodation: false,
      localTransport: false,
      activities: false,
      none: false,
    }
  }

  componentDidMount() {
    // always start on top of page
    window.scrollTo(0, 0)

    // Set defaults based on query string parameters
    if (this.state.queryParams.map === 'true') this.setState({ showMap: true })

    // Empty root state of newLikes (to remove notification dot)
    this.props.setRootState('newLikes', [])

    // fetch data if likes
    this.setState({ isLoading: true }, () => {
      if (this.props.likedPlaces && this.props.likedPlaces.length > 0) {
        let itemsProcessed = 0
        // for each of the fetched destinations in the list do:
        this.props.likedPlaces.forEach(id => {
          // 1. fetch the data
          fetchSingleDestination(id)
            .then(response => response.json())
            .then(item => {
              // 2. retrieve flickr Images
              GetFlickrImages(item.name)
                .then(imageUrls => {
                  return {
                    ...item,
                    images: imageUrls,
                    // 3. set liked to true as we are on bucketlist page
                    liked: true,
                  }
                })
                // 4. save fetched destination to state
                .then(item =>
                  this.setState(
                    {
                      destinationList: [...this.state.destinationList, item],
                    },
                    // callback: do something when all destinations are loaded
                    () => {
                      itemsProcessed++
                      if (itemsProcessed === this.props.likedPlaces.length) {
                        this.setState({ isLoading: false })
                        // callback: fitMapToPlaces when map & all destinations are loaded
                        if (this.state.mapApiLoaded) {
                          fitMapToPlaces(
                            this.state.mapInstance,
                            this.state.mapApi,
                            this.state.destinationList,
                          )
                        }
                      }
                    },
                  ),
                )
            })
            .catch(err => window.console && console.log(err))
        })
      } else {
        this.setState({ destinationList: [], isLoading: false })
      }
    })
  }

  removeLike(id) {
    // remove from destination list
    const newDestinationList = this.state.destinationList.filter(
      destination => destination.id !== id,
    )
    newDestinationList.length > 0
      ? this.setState({ destinationList: newDestinationList })
      : this.setState({ destinationList: [] })

    // update root state of liked places
    this.props.setRootState(
      'likedPlaces',
      updateListItem(this.props.likedPlaces, id),
    )
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    })
  }

  toggleShowMap() {
    this.setState({ showMap: !this.state.showMap })
    window.scrollTo(0, 0)
    // Update query string in url
    const newQueryParams = this.state.queryParams
    newQueryParams.map = !this.state.showMap
    pushUrlWithQueryParams(newQueryParams, this.props)
  }

  toggleDialog() {
    this.setState({ dialogOpen: !this.state.dialogOpen })
  }

  handleTextFieldChange = event => {
    this.setState({
      textFieldValue: event.target.value,
    })
  }

  handleCheckboxChange = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked })
  }

  render() {
    const { classes } = this.props
    const {
      flights,
      accommodation,
      localTransport,
      activities,
      none,
    } = this.state

    const checkboxError =
      [flights, accommodation, localTransport, activities, none].filter(v => v)
        .length === 0

    const bookingPreferences = [
      { key: 'flights', value: flights },
      { key: 'accommodation', value: accommodation },
      { key: 'local_transport', value: localTransport },
      { key: 'activities', value: activities },
      { key: 'none', value: none },
    ]

    return (
      <div className={classes.body}>
        <TopAppBar
          showMap={this.state.showMap}
          toggleShowMap={() => this.toggleShowMap()}
        >
          <Typography variant="h6" component="h1" className={classes.pageTitle}>
            My bucket list
          </Typography>
        </TopAppBar>
        {this.state.showMap ? (
          <React.Fragment>
            {/* if no destinations show FAB on map to start exploring */}
            {this.state.destinationList === null && (
              <MapFloatingActionButton
                onClick={() => {
                  this.props.history.push('/explore')
                }}
              >
                <ExploreIcon className={classes.extendedIcon} />
                Start exploring
              </MapFloatingActionButton>
            )}
            {/* map component */}
            <div className={classes.mapContainer}>
              <Mapview
                apiHasLoaded={(map, maps) => {
                  this.apiHasLoaded(map, maps)
                  // after history.back() from destinationPage, destiantionList is empty at this point
                  // for that situation, fitMapToPlaces() is called in the componendDidMount()
                  if (this.state.destinationList.length > 0)
                    fitMapToPlaces(map, maps, this.state.destinationList)
                }}
                places={this.state.destinationList}
                toggleLike={id => {
                  this.removeLike(id)
                }}
                history={this.props.history}
              />
            </div>
          </React.Fragment>
        ) : (
          // {/* If no likedDestinations, destinationsList is set to null and warning should be displayed */}
          <React.Fragment>
            <ResultsBar
              text={
                this.props.likedPlaces.length +
                (this.props.likedPlaces.length === 1 ? ' place' : ' places') +
                ' to travel to'
              }
            />
            <Album>
              {this.state.destinationList.map(place => (
                <Grid item key={place.id} xs={12} sm={6} md={4}>
                  <DestinationCard
                    place={place}
                    toggleLike={id => this.removeLike(id)}
                    onClick={() => {
                      // send to destination page
                      this.props.history.push('/explore/' + place.id)
                    }}
                  />
                </Grid>
              ))}
              {/* If 0 likes after loading, show warning card */}
              {this.state.destinationList.length === 0 &&
                this.state.isLoading === false && (
                  <Grid item>
                    <WarningCard />
                  </Grid>
                )}
            </Album>
            {this.state.isLoading && <Loader />}
            {/* functionality for checkout dialog starts here */}
            {this.state.destinationList.length > 0 && (
              <FloatingActionButton
                onClick={() => {
                  this.toggleDialog()

                  // send google analytics event
                  ReactGA.event({
                    category: 'Bucket list',
                    action: 'Start checkout dialog',
                    value: 50,
                  })
                }}
              />
            )}
            <CheckoutDialog
              open={this.state.dialogOpen}
              handleClose={() => this.toggleDialog()}
              textFieldValue={this.state.textFieldValue}
              handleTextFieldChange={this.handleTextFieldChange}
              handleSubmit={event => {
                event.preventDefault()
                const likes = this.state.destinationList.map(dest => dest.id)
                // first signup, then add event as an event needs a member to be registered
                postSignupForm(
                  this.state.textFieldValue,
                  'subscribed',
                  window.location.pathname,
                  false,
                  likes,
                  bookingPreferences,
                )
                  .then(id => {
                    // if null returned, the user already exists so we need to patch the member
                    // the LikesHtml field is a temporary utility and will be overwritten each time
                    if (id === null) {
                      patchSignupFormLikes(
                        this.state.textFieldValue,
                        likes,
                        bookingPreferences,
                      )
                    }
                  })
                  .then(() => {
                    // An event is posted for permanent storage, plus triggers the campaign automation
                    postLikesEvent(
                      this.state.textFieldValue,
                      likes,
                      bookingPreferences,
                    )
                  })
                this.toggleDialog()
                this.setState({ thanksBarOpen: true })

                // send google analytics event
                ReactGA.event({
                  category: 'Bucket list',
                  action: 'Complete checkout dialog',
                  value: 100,
                })
              }}
              // props for the checkboxes in the dialog
              flights={flights}
              accommodation={accommodation}
              localTransport={localTransport}
              activities={activities}
              none={none}
              checkboxError={checkboxError}
              handleCheckboxChange={this.handleCheckboxChange}
            />
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              open={this.state.thanksBarOpen}
              onClose={() => this.setState({ thanksBarOpen: false })}
              message="Thank you! Your bucket list has been sent."
            />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Bucketlist))
