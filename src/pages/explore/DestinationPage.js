import React, { Component } from 'react'
import ReactGA from 'react-ga'
import { Redirect } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'
// import ShareIcon from '@material-ui/icons/Share'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Button from '@material-ui/core/Button'

import { fetchSingleDestination } from 'components/fetching'
import PhotoCarousel from 'components/destinationCard/Carousel'
import GetFlickrImages from 'components/destinationCard/GetFlickrImages'
import Loader from 'components/fetching/Loader'
import ConsecutiveSnackbars from 'components/ConsecutiveSnackbars'
import fetchWikivoyageInfo from 'components/fetching/thirdParties/FetchWikivoyageInfo'
import fetchWikivoyageLinks from 'components/fetching/thirdParties/FetchWikivoyageLinks'
import { updateListItem } from 'components/utils'
import ChipContainer from 'components/destinationCard/ChipContainer'
import GoogleMap from 'components/mapview/components/GoogleMap'
import DestinationPin from 'components/mapview/components/DestinationPin'
import SingleLineGridList from 'components/SingleLineGridList'

const styles = theme => ({
  toolbar: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  divider: {
    margin: theme.spacing(1.5),
  },
  ContainerItem: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    height: '50vh',
    width: '100%',
  },
})

class DestinationPage extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      // destination_id is determined from the url (match is passed through props)
      destination_id: props.match.params.name,
      placeData: {},
      isLoading: true,
      redirect: false,

      // state for like/dislike snackbar message
      snackbarMessage: null,
      snackbarPlaceId: null,
    }
  }

  componentDidMount() {
    this._isMounted = true

    // If no already liked destinations, set to empty array
    if (this.state.likedDestinations === null)
      this.setState({ likedDestinations: [] })

    // Fetch place data
    this.setState({ isLoading: true }, () => {
      fetchSingleDestination(
        this.state.destination_id,
        this.props.profilesQuery,
      )
        .then(response => response.json())
        .then(item => {
          // if no place fetched, redirect to /explore
          if (item === null) {
            this.setState({
              redirect: true,
            })
          } else {
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
              // 3. get wikivoyage description
              .then(item =>
                fetchWikivoyageInfo(item.wiki_id).then(info => {
                  return {
                    ...item,
                    info: info,
                  }
                }),
              )
              // 4. Fetch wikivoyage attribution links
              .then(item =>
                fetchWikivoyageLinks(item.wiki_id).then(links => {
                  return {
                    ...item,
                    wikiLinks: links,
                  }
                }),
              )
              // 5. save fetched destination to state
              .then(item => {
                if (this._isMounted) {
                  this.setState({
                    placeData: item,
                    isLoading: false,
                  })
                }
              })
          }
        })
        //   TODO: display something when error is found instead of printing to console
        .catch(err => {
          window.console && console.log(err)
        })
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  toggleLike(id) {
    // update state
    this.setState(prevState => ({
      placeData: {
        ...this.state.placeData,
        liked: !prevState.placeData.liked,
      },
    }))
    // update root level state
    this.updateLikedPlaces(id)
    this.updateNewLikes(id)
    this.updateSnackbarMessage(id)
    // send google analytics event
    ReactGA.event({
      category: 'Explore',
      action: 'Place like',
      value: 20,
    })
  }

  updateLikedPlaces(id) {
    // For bucketlist page: keep track of likes and save in an array to session storage
    this.props.setRootState(
      'likedPlaces',
      updateListItem(this.props.likedPlaces, id),
    )
  }

  updateNewLikes(id) {
    // don't update new likes when visiting destinationPage from bucketlist!
    if (
      !(
        this.props.likedPlaces.includes(id) && !this.props.newLikes.includes(id)
      )
    ) {
      this.props.setRootState(
        'newLikes',
        updateListItem(this.props.newLikes, id),
      )
    }
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

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/explore" />
    }
  }

  render() {
    const { placeData } = this.state
    const { classes } = this.props

    return (
      <div>
        {this.renderRedirect()}
        {/* Top app bar */}
        <AppBar position="fixed" color="default">
          <Container maxWidth="md">
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                aria-label="Back to previous page"
                color="secondary"
                onClick={() => {
                  // If there's no in-site history, go back to /explore
                  if (this.props.prevPath === '') {
                    this.props.history.push('/explore')
                  } else {
                    this.props.history.goBack()
                  }
                }}
              >
                <ArrowBackIosOutlinedIcon />
              </IconButton>
              <div>
                {/* <IconButton
                  aria-label="Share on social media"
                  color="secondary"
                  // onClick={TODO: DoSomething}
                >
                  <ShareIcon />
                </IconButton> */}
                <IconButton
                  edge="end"
                  aria-label="Add to favorites"
                  color="primary"
                  onClick={() => this.toggleLike(placeData.id)}
                >
                  {placeData.liked ? <FavoriteIcon /> : <FavoriteBorder />}
                </IconButton>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
        <Toolbar />
        {/* Actual page */}
        {this.state.isLoading ? (
          <Loader shadow={0} />
        ) : (
          <Container maxWidth="sm">
            {/* Place title */}
            <div className={classes.ContainerItem} align="center">
              <Typography color="secondary" variant="h6" component="h2">
                {placeData.name}
              </Typography>
              <Typography color="textSecondary" variant="body1" component="p">
                {placeData.country}
              </Typography>
            </div>
            {/* Place photos */}
            <div align="center">
              <PhotoCarousel
                imageList={placeData.images}
                showAttribution={true}
              />
            </div>

            {/* Call 2 Action like button */}
            {/* <Divider variant="middle" className={classes.divider} /> */}
            <Container className={classes.ContainerItem} align="center">
              <Button
                variant="contained"
                onClick={() => this.toggleLike(placeData.id)}
                color={placeData.liked ? 'default' : 'primary'}
                fullWidth={true}
                startIcon={
                  placeData.liked ? <FavoriteIcon /> : <FavoriteBorder />
                }
              >
                {placeData.liked ? 'Saved in' : 'Add to'} bucket list
              </Button>
            </Container>

            {/* Features */}
            <Divider variant="middle" className={classes.divider} />
            <Typography variant="h6">Known for</Typography>
            <ChipContainer
              features={placeData.features}
              color="default"
              size="medium"
            />

            {/* Place description */}
            <Divider variant="middle" className={classes.divider} />
            <Typography variant="h6">Description</Typography>
            <div className={classes.ContainerItem}>
              {placeData.info &&
                // split description in multiple alineas
                placeData.info.split('\n').map((paragraph, key) => {
                  return (
                    <Typography variant="body2" key={key} paragraph>
                      {paragraph}
                    </Typography>
                  )
                })}
              {placeData.wikiLinks && (
                <Typography variant="caption">
                  <i>
                    Credits to the{' '}
                    <Link
                      href={placeData.wikiLinks.revisionUrl}
                      target="_blank"
                      rel="noopener"
                      color="secondary"
                    >
                      contributors
                    </Link>{' '}
                    of the full{' '}
                    <Link
                      href={placeData.wikiLinks.pageUrl}
                      target="_blank"
                      rel="noopener"
                      color="secondary"
                    >
                      {placeData.name}
                    </Link>{' '}
                    article at Wikivoyage.
                  </i>
                </Typography>
              )}
            </div>

            {/* Map */}
            <Divider variant="middle" className={classes.divider} />
            <Typography variant="h6">Location</Typography>
            <div className={`${classes.mapContainer} ${classes.ContainerItem}`}>
              <GoogleMap
                // options={
                //   {
                // Will capture all touch events on the map towards map panning
                // gestureHandling: 'greedy',
                //   }
                // }
                center={[placeData.lat, placeData.lng]}
                zoom={6}
              >
                <DestinationPin
                  // this is required to handle clicks
                  key={placeData.id}
                  // these are required by google map to plot
                  lat={placeData.lat}
                  lng={placeData.lng}
                  // these are passed along to destinationPin
                  show={false}
                  isLiked={false}
                  placeType={placeData.type}
                  placeStatus={placeData.status}
                />
              </GoogleMap>
            </div>

            {/* Map */}
            <Divider variant="middle" className={classes.divider} />
            <Typography variant="h6">Places nearby</Typography>
            <div className={classes.ContainerItem}>
              <SingleLineGridList />
            </div>

            <br />
            <br />
            <br />
          </Container>
        )}
        <ConsecutiveSnackbars
          snackbarMessage={this.state.snackbarMessage}
          undoButton={true}
          handleUndo={() => this.toggleLike(this.state.snackbarPlaceId)}
        />
      </div>
    )
  }
}

export default withStyles(styles)(DestinationPage)
