import React, { Component } from 'react'

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
    console.log(this.state.destination_id)
    this.fetchSingleDestination(this.state.destination_id)
      .then(response => response.json())
      .then(destinationJson => this.setdestination(destinationJson))
      //   TODO: display something when error is found instead of printing to console
      .catch(err => console.log(err))
  }

  fetchSingleDestination(id) {
    return fetch(process.env.REACT_APP_API_URL + '/api/' + id)
  }

  // Change state of variable 'destination_data'
  setdestination(destination_data) {
    this.setState(old => ({
      ...old,
      destination_data,
    }))
  }

  render() {
    return (
      <div>
        <p>destination id = {this.state.destination_id}</p>
        <p>name = {this.state.destination_data.name} </p>
      </div>
    )
  }
}

export default DestinationPage
