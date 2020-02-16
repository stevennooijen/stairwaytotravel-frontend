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
import GetFlickrImages from 'components/destinationCard/GetFlickrImages'

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
