import React from 'react'

import Grid from '@material-ui/core/Grid'

import Album from 'components/album'
import DestinationCard from 'components/destination'
// import ExampleList from 'assets/Constants'

// 1) Move this list to sessionStorage, and read from there
// 2) Make sure interactivity with like button stores like/dislike in sessionStorage (same list? Or seperate like list?)
// 3) Add logic for fetching multiple destinations based on user id

class Bucketlist extends React.Component {
  _isMounted = false

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
    this._isMounted = true
    this.fetchDestinations()
      .then(response => response.json())
      // save contents of response into state
      .then(data => this.setState({ destinationList: data.Destinations }))
      .catch(err => console.log(err))
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
  }

  render() {
    return (
      <Album>
        {this.state.destinationList.map(card => (
          // Grid en DestinationCard zijn "domme" componenten die zelf geen state bijhouden en alleen UI doen
          // State blijft zodoende in de Bucketlist component op 'hoog' niveau
          <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
            <DestinationCard
              id={card.id}
              title={card.name}
              // image={card.image}
              image={require('../../assets/beach.jpg')}
              text={card.country_name}
              liked={card.liked}
              toggleLike={id => this.toggleLike(id)}
            />
          </Grid>
        ))}
      </Album>
    )
  }
}

export default Bucketlist