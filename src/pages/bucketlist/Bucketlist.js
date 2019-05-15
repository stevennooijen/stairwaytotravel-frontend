import React from 'react'

import Album from 'components/album'

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
          // TODO: Make image an array of urls.
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

  render() {
    return <Album cards={this.state.list} />
  }
}

export default Bucketlist
