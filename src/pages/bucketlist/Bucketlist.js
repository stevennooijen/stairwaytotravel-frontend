import React from 'react'
import Grid from '@material-ui/core/Grid'

import Album from 'components/Album'
import DestinationCard from 'components/destinationCard/DestinationCard'
import WarningCard from 'components/WarningCard'
// import ExampleList from 'assets/Constants'

class Bucketlist extends React.Component {
  _isMounted = false

  constructor(props) {
    super(props)

    this.state = {
      continent: sessionStorage.getItem('continent'),
      // For testing purposes, could use ExampleList from Constants. destinationList: ExampleList,
      // Initialize empty if for when nothing in sessionStorage
      destinationList: undefined,
      likesCount: 0,
    }
  }

  // Initialize destinations and likes if something in sessionStorage
  componentDidMount() {
    this._isMounted = true
    const itemList = JSON.parse(sessionStorage.getItem('destinationList'))
    this.setState({
      destinationList: itemList,
    })
    this.calculateLikes(itemList)
  }

  calculateLikes(destinations) {
    if (destinations) {
      this.setState({
        likesCount: destinations.filter(item => item.liked === true).length,
      })
    } else {
      this.setState({ likesCount: 0 })
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
    sessionStorage.setItem('destinationList', JSON.stringify(newList))

    // update likes count for warning message if likesCount = 0
    this.calculateLikes(newList)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
      <main>
        {this.state.likesCount > 0 ? (
          // Show liked destinations if likesCount > 0
          <Album>
            {this.state.destinationList.map(
              place =>
                // only show cards when they are liked
                place.liked ? (
                  // Grid en DestinationCard zijn "domme" componenten die zelf geen state bijhouden en alleen UI doen
                  // State blijft zodoende in de Bucketlist component op 'hoog' niveau
                  <Grid item key={place.id} xs={12} sm={6} md={4} lg={3}>
                    <DestinationCard
                      place={place}
                      toggleLike={id => this.toggleLike(id)}
                    />
                  </Grid>
                ) : null,
            )}
          </Album>
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

export default Bucketlist
