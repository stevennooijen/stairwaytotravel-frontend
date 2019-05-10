import React from 'react'

import Album from 'components/Album'

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const cards = [
  {
    image: require('../../assets/pool.jpg'),
    title: 'Title 1',
  },
  {
    image: require('../../assets/pool.jpg'),
    title: 'Title 2',
  },
  {
    image: require('../../assets/beach.jpg'),
    title: 'Title 3',
  },
]

class Bucketlist extends React.Component {
  render() {
    return <Album cards={cards} />
  }
}

export default Bucketlist
