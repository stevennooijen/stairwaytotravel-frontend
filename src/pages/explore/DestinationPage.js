import React, { Component } from 'react'
import Destination from './Destination'
import Button from '@material-ui/core/Button'

class DestinationPage extends Component {
  // Constructor can only be called once to define state
  constructor(props) {
    super(props)
    // Define initial state
    this.state = {
      // destination_id is determined from the url (match is passed through props)
      destination_id: props.match.params.name,
      // destination_data will fill itself with the API data
      destination_data: {},
      // Possibly do something with a loading variable
      // https://facebook.github.io/react-native/docs/network
      // isLoading: true,
    }
  }

  // Pipeline of functions. Result of previous is piped into next function
  componentDidMount() {
    this.fetchProfile(this.state.destination_id)
      .then(response => response.json())
      // .then(responseJson => this.fetchFirstDestination(responseJson))
      .then(destinationJson => this.setdestination(destinationJson))
      .catch(err => console.log(err))
  }

  // Call an API, proxy set through package.json
  fetchProfile(id) {
    if (id) {
      return fetch('/api/' + id)
    }
    return fetch('/api/', {
      // mode: 'no-cors', // 'cors' by default
      // accept: 'application/json',
    })
  }

  // Retrieve info from JSON
  // fetchFirstDestination(responseJson) {
  //   return fetch(responseJson[0])
  // }

  // Change state of variable 'destination_data'
  setdestination(destination_data) {
    this.setState(old => ({
      ...old,
      destination_data,
    }))
  }

  render() {
    // Use curly brackets to retrieve specific items from an object
    // const { destination } = this.state

    return (
      <div>
        <p>destination id = {this.state.destination_id}</p>
        <Destination name={this.state.destination_data.name} />
        <Button variant="contained" color="primary">
          Dislike
        </Button>
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          Like
        </Button>
      </div>
    )
  }
}

export default DestinationPage
