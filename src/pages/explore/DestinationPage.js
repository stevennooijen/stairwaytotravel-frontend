import React, { Component } from 'react'

import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import { fetchSingleDestination } from 'components/fetching'
import TopAppBar from 'components/TopAppBar'
import PhotoCarousel from 'components/destinationCard/Carousel'
import GetFlickrImages from 'components/destinationCard/GetFlickrImages'
import Loader from 'components/fetching/Loader'
import fetchWikivoyageInfo from 'components/fetching/thirdParties/FetchWikivoyageInfo'

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
            // 4. save fetched destination to state
            .then(item => {
              console.log(item)
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
    // const { classes } = this.props

    return (
      <div>
        <TopAppBar />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <PhotoCarousel imageList={placeData.images} />
        )}

        <Divider variant="middle" />
        <Typography color="textSecondary" variant="h6" component="h2">
          {placeData.name}
        </Typography>
        <Typography color="textSecondary" variant="body1" component="p">
          {placeData.country}
        </Typography>

        <Divider variant="middle" />
        <Typography variant="body">{placeData.info}</Typography>

        <Divider variant="middle" />
        <p>destination id = {this.state.destination_id}</p>
        <p>name = {this.state.placeData.name} </p>
      </div>
    )
  }
}

export default DestinationPage
