import React from 'react'
import Grid from '@material-ui/core/Grid'

import Album from 'components/Album'
import DestinationCard from 'components/destination'
// import ExampleList from 'assets/Constants'
import GetFlickrImage from 'components/GetFlickrImage'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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
    }
  }

  // Pipeline of functions. Result of previous is piped into next function
  componentDidMount() {
    // this._isMounted = true
    const itemList = JSON.parse(sessionStorage.getItem('destinationList'))

    if (itemList === null) {
      // First fetch the list of recommended destinations
      this.fetchDestinations()
        .then(response => response.json())
        // Second, add flickr images to each destination
        .then(data => {
          const destinationData = data.Destinations

          // for each destination, create a promise that needs to be resolved and save in item.image
          const promises = destinationData.map(item => {
            // query based on destination name + country_name + (possibly activity filter?) + (geolocation?)
            return GetFlickrImage(item.name).then(image_url => {
              return {
                ...item,
                image: image_url,
              }
            })
          })

          // Await on all promises
          return Promise.all(promises)
        })
        // When all results have arrived, put them into the component's state
        .then(data => {
          this.setState({ destinationList: data })
        })
        .catch(err => console.log(err))
    } else {
      this.setState({ destinationList: itemList })
    }
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

  render() {
    const { classes } = this.props

    return (
      <main>
        {/* check if destinations are loaded, if not display progress */}
        {this.state.destinationList && this.state.destinationList.length ? (
          <Album>
            {this.state.destinationList.map(card => (
              // Grid en DestinationCard zijn "domme" componenten die zelf geen state bijhouden en alleen UI doen
              // State blijft zodoende in de Bucketlist component op 'hoog' niveau
              <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
                <DestinationCard
                  id={card.id}
                  title={card.name}
                  image={card.image}
                  // image={require('../../assets/beach.jpg')}
                  text={card.country_name}
                  liked={card.liked}
                  toggleLike={id => this.toggleLike(id)}
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
      </main>
    )
  }
}

export default withStyles(styles)(Explore)
