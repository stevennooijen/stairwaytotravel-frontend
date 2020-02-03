import React from 'react'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'

import Album from 'components/Album'
import DestinationCard from 'components/destinationCard/DestinationCard'
import WarningCard from './WarningCard'
import { fetchSingleDestination } from '../../components/fetching'
import GetFlickrImage from 'components/destinationCard/GetFlickrImage'

const styles = theme => ({
  loaderContainer: {
    marginTop: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
  },
})

class Bucketlist extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      destinationList: [],
      // likedDestinations: JSON.parse(
      //   sessionStorage.getItem('likedDestinations'),
      // ),
    }
  }

  componentDidMount() {
    // Initialize destinations and likes if something in sessionStorage
    const likedDestinationList = JSON.parse(
      sessionStorage.getItem('likedDestinations'),
    )
    // fetch data if likes
    if (likedDestinationList && likedDestinationList.length > 0) {
      likedDestinationList.forEach(id => {
        fetchSingleDestination(id)
          .then(response => response.json())
          // Store each item in destinationList
          .then(destinationJson => {
            destinationJson.liked = true
            this.setState({
              destinationList: [...this.state.destinationList, destinationJson],
            })
            return destinationJson.name
          })
          // Then fetch image and save in 'image' attribute in appropriate list item
          .then(destinationName => {
            this.fetchImage(destinationName)
          })
          .catch(err => console.log(err))
      })
    } else {
      this.setState({ destinationList: null })
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

  render() {
    const { classes } = this.props

    return (
      <main>
        {/* If no likedDestinations, destinationsList is set to null and warning should be displayed */}
        {this.state.destinationList ? (
          // Show loading indicator till destinations are fetched
          this.state.destinationList.length > 0 ? (
            <Album>
              {this.state.destinationList.map(place => (
                <Grid item key={place.id} xs={12} sm={6} md={4} lg={3}>
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
      </main>
    )
  }
}

export default withRouter(withStyles(styles)(Bucketlist))
