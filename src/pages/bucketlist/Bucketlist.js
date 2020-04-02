import React from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import { withStyles } from '@material-ui/core/styles'
import { Typography, Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import ExploreIcon from '@material-ui/icons/Explore'

import Album from 'components/Album'
import DestinationCard from 'components/destinationCard/DestinationCard'
import WarningCard from './WarningCard'
import { fetchSingleDestination } from '../../components/fetching'
import GetFlickrImages from 'components/destinationCard/GetFlickrImages'
import FloatingActionButton from './FloatingActionButton'
import TopAppBar from '../../components/TopAppBar'
import { Mapview } from '../../components/mapview'
import {
  getMapBounds,
  bindResizeListener,
} from '../../components/mapview/utils'
import { pushUrlWithQueryParams } from '../../components/utils'
import MapFloatingActionButton from '../../components/mapview/components/MapFloatingActionButton'
import CheckoutDialog from './CheckoutDialog'
import postSignupForm from '../../components/fetching/mailchimp/PostSignupForm'
import addLikesEvent from '../../components/fetching/mailchimp/AddLikesEvent'
import patchMemberLikesHtml from '../../components/fetching/mailchimp/PatchMemberLikesHtml'

const MINIMUM_ZOOM = 8

const styles = theme => ({
  pageTitle: {
    width: '100%',
  },
  loaderContainer: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
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

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  if (places !== null) {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places)
    // Fit map to bounds
    map.fitBounds(bounds)
    // Enforce minimal zoom level
    const zoom = map.getZoom()
    map.setZoom(zoom > MINIMUM_ZOOM ? MINIMUM_ZOOM : zoom)
    // Bind the resize listener
    bindResizeListener(map, maps, bounds)
  }
}

class Bucketlist extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      destinationList: [],
      queryParams: queryString.parse(this.props.location.search),
      showMap: false,
      dialogOpen: false,

      // checkoutDialog features
      textFieldValue: '',
      flights: false,
      accomodation: false,
      localTransport: false,
      activities: false,
      none: false,
    }
  }

  componentDidMount() {
    // Set defaults based on query string parameters
    if (this.state.queryParams.map === 'true') this.setState({ showMap: true })

    // Initialize destinations and likes if something in sessionStorage
    const likedDestinationList = JSON.parse(
      sessionStorage.getItem('likedDestinations'),
    )
    // fetch data if likes
    if (likedDestinationList && likedDestinationList.length > 0) {
      // for each of the fetched destinations in the list do:
      likedDestinationList.forEach(id => {
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
                this.setState({
                  destinationList: [...this.state.destinationList, item],
                }),
              )
          })
          .catch(err => console.log(err))
      })
    } else {
      this.setState({ destinationList: null })
    }
  }

  removeLike(id) {
    // remove from destination list
    const newDestinationList = this.state.destinationList.filter(
      destination => destination.id !== id,
    )
    newDestinationList.length > 0
      ? this.setState({ destinationList: newDestinationList })
      : this.setState({ destinationList: null })

    // removed from liked list in session storage
    const likedDestinations = JSON.parse(
      sessionStorage.getItem('likedDestinations'),
    )
    const newLikedDestinations = likedDestinations.filter(item => item !== id)
    sessionStorage.setItem(
      'likedDestinations',
      JSON.stringify(newLikedDestinations),
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
      accomodation,
      localTransport,
      activities,
      none,
    } = this.state

    const checkboxError =
      [flights, accomodation, localTransport, activities, none].filter(v => v)
        .length === 0

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
                apiHasLoaded={(map, maps) =>
                  apiIsLoaded(map, maps, this.state.destinationList)
                }
                places={this.state.destinationList}
                toggleLike={id => {
                  this.removeLike(id)
                }}
              />
            </div>
          </React.Fragment>
        ) : // {/* If no likedDestinations, destinationsList is set to null and warning should be displayed */}
        this.state.destinationList ? (
          // Show loading indicator till destinations are fetched
          this.state.destinationList.length > 0 ? (
            <div>
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
              </Album>
              <FloatingActionButton onClick={() => this.toggleDialog()} />
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
                    'transactional',
                    window.location.pathname,
                    likes,
                  )
                    .then(id => {
                      // if null returned, the user already exists so we need to patch the member
                      // the LikesHtml field is a temporary utility and will be overwritten each time
                      if (id === null) {
                        patchMemberLikesHtml(this.state.textFieldValue, likes)
                      }
                    })
                    .then(() => {
                      // An event is posted for permanent storage, plus triggers the campaign automation
                      addLikesEvent(this.state.textFieldValue, likes)
                    })
                  this.toggleDialog()
                }}
                // props for the checkboxes in the dialog
                flights={flights}
                accomodation={accomodation}
                localTransport={localTransport}
                activities={activities}
                none={none}
                checkboxError={checkboxError}
                handleCheckboxChange={this.handleCheckboxChange}
              />
            </div>
          ) : (
            //  show Indeterminate progress indicator while waiting for destinations to load
            <Container className={classes.loaderContainer}>
              <CircularProgress />
            </Container>
          )
        ) : (
          // Provide warning if no liked destinations
          <Album>
            <WarningCard />
          </Album>
        )}
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Bucketlist))
