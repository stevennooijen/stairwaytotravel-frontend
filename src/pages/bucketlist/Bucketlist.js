import React from 'react'

import Grid from '@material-ui/core/Grid'

import Album from 'components/album'
import DestinationCard from 'components/destination'

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// 1) Move this list to sessionStorage, and read from there
// 2) Make sure interactivity with like button stores like/dislike in sessionStorage (same list? Or seperate like list?)
// 3) Add logic for fetching multiple destinations based on user id

class Bucketlist extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [
        {
          id: 1,
          // TODO: Make image an array of image_urls.
          image: require('../../assets/pool.jpg'),
          title: 'Title 1',
          liked: false,
        },
        {
          id: 2,
          image: require('../../assets/pool.jpg'),
          title: 'Title 2',
          liked: false,
        },
        {
          id: 3,
          image: require('../../assets/beach.jpg'),
          title: 'Title 3',
          liked: false,
        },
      ],
      // newItem: '',
      // list: [],
    }
  }

  toggleLike(id) {
    const newList = this.state.list.map(item => {
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
      list: newList,
    })

    // hier: api call naar backend. dat wanneer je de pagina refresht en vraagt wat de gelikedte kaarten zijn dat alles weer teurg komt.
    // beetje state in de front-end en dan veel state in de backend!

    // Hier: Apart lijstje van likes wegschijven naar session/localStorage
    // Bij like data kopieren van de een naar de lijst met likes. en een update naar de backend
  }

  render() {
    return (
      <Album>
        {this.state.list.map(card => (
          // Grid en DestinationCard zijn "domme" componenten die zelf geen state bijhouden en alleen UI doen
          // State blijft zodoende in de Bucketlist component op 'hoog' niveau
          <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
            <DestinationCard
              id={card.id}
              title={card.title}
              image={card.image}
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
