import React, { Component } from 'react'
import ReactGA from 'react-ga'

import { withStyles } from '@material-ui/core/styles'
// import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined'
import ShareIcon from '@material-ui/icons/Share'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

import { fetchSingleDestination } from 'components/fetching'
import PhotoCarousel from 'components/destinationCard/Carousel'
import GetFlickrImages from 'components/destinationCard/GetFlickrImages'
import Loader from 'components/fetching/Loader'
import fetchWikivoyageInfo from 'components/fetching/thirdParties/FetchWikivoyageInfo'
import fetchWikivoyageLinks from 'components/fetching/thirdParties/FetchWikivoyageLinks'

const styles = theme => ({
  toolbar: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  ContainerItem: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
})

class DestinationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // destination_id is determined from the url (match is passed through props)
      destination_id: props.match.params.name,
      placeData: {},
      isLoading: true,
      likedDestinations: JSON.parse(
        sessionStorage.getItem('likedDestinations'),
      ),
    }
  }

  componentDidMount() {
    // If no already liked destinations, set to empty array
    if (this.state.likedDestinations === null)
      this.setState({ likedDestinations: [] })

    // Fetch place data
    this.setState({ isLoading: true }, () => {
      fetchSingleDestination(this.state.destination_id)
        .then(response => response.json())
        .then(item => {
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
            // 3. get wikivoyage description
            .then(item =>
              fetchWikivoyageInfo(item.id).then(info => {
                return {
                  ...item,
                  info: info,
                }
              }),
            )
            // 4. Fetch wikivoyage attribution links
            .then(item =>
              fetchWikivoyageLinks(item.id).then(links => {
                return {
                  ...item,
                  wikiLinks: links,
                }
              }),
            )
            // 5. save fetched destination to state
            .then(item => {
              this.setState({
                placeData: item,
                isLoading: false,
              })
            })
        })
        //   TODO: display something when error is found instead of printing to console
        .catch(err => window.console && console.log(err))
    })
  }

  render() {
    const { placeData } = this.state
    const { classes } = this.props

    return (
      <div>
        {/* Top app bar */}
        <AppBar position="fixed" color="default">
          <Container maxWidth="md">
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                aria-label="Back to previous page"
                color="secondary"
                onClick={() => this.props.history.goBack()}
              >
                <ArrowBackIosOutlinedIcon />
              </IconButton>
              <div>
                <IconButton
                  aria-label="Share on social media"
                  color="secondary"
                  // onClick={TODO: DoSomething}
                >
                  <ShareIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="Add to favorites"
                  color="primary"
                  onClick={e => {
                    this.setState(prevState => ({
                      placeData: {
                        ...placeData,
                        liked: !prevState.placeData.liked,
                      },
                    }))
                    // send google analytics event
                    ReactGA.event({
                      category: 'Explore',
                      action: 'Place like',
                      value: 20,
                    })
                  }}
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
          <Loader />
        ) : (
          <Container maxWidth="sm">
            {/* Place title */}
            <div className={classes.ContainerItem} align="center">
              <Typography color="textSecondary" variant="h6" component="h2">
                {placeData.name}
              </Typography>
              <Typography color="textSecondary" variant="body1" component="p">
                {placeData.country}
              </Typography>
            </div>

            {/* Place photos */}
            <div align="center">
              <PhotoCarousel imageList={placeData.images} />
            </div>

            {/* Place description */}
            {/* <Divider variant="middle" /> */}
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
                  {' '}
                  <i>
                    Credits to the{' '}
                    <Link
                      href={placeData.wikiLinks.revisionUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      contributors
                    </Link>{' '}
                    of the full{' '}
                    <Link
                      href={placeData.wikiLinks.pageUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      {placeData.name}
                    </Link>{' '}
                    article at Wikivoyage.
                  </i>
                </Typography>
              )}
            </div>

            <br />
            <br />
            <br />
            <br />
          </Container>
        )}
      </div>
    )
  }
}

export default withStyles(styles)(DestinationPage)
