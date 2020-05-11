import React, { Component } from 'react'
import { fetchSingleDestination } from '../../components/fetching'

import TopAppBar from 'components/TopAppBar'
import PhotoCarousel from 'components/destinationCard/Carousel'
import GetFlickrImages from 'components/destinationCard/GetFlickrImages'
import Loader from 'components/fetching/Loader'

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
            // 3. save fetched destination to state
            .then(item =>
              this.setState({
                placeData: item,
                isLoading: false,
              }),
            )
        })
        //   TODO: display something when error is found instead of printing to console
        .catch(err => window.console && console.log(err))
    })
  }

  render() {
    const { placeData } = this.state
    // const { classes } = this.props

    return (
      <div>
        <TopAppBar />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <PhotoCarousel imageList={placeData.images} />
        )}
        <p>destination id = {this.state.destination_id}</p>
        <p>name = {this.state.placeData.name} </p>
      </div>
    )
  }
}

export default DestinationPage
