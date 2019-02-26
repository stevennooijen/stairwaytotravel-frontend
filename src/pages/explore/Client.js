import React, { Component } from 'react'

// Actual app component
export default class ApiCall extends Component {
  // Constructor can only be called once to define state
  constructor(props) {
    super(props)

    // Define initial state
    this.state = {
      destination: {},
      // Possibly do something with a loading variable
      // https://facebook.github.io/react-native/docs/network
      // isLoading: true,
    }
  }

  // Pipeline of functions. Result of previous is piped into next function
  componentDidMount() {
    this.fetchProfile()
      .then(response => response.json())
      // .then(responseJson => this.fetchFirstDestination(responseJson))
      .then(destinationJson => this.setdestination(destinationJson))
      .catch(err => console.log(err))
  }

  // Call an API, proxy set through package.json
  fetchProfile() {
    return fetch('/api/', {
      // mode: 'no-cors', // 'cors' by default
      // accept: 'application/json',
    })
  }

  // Retrieve info from JSON
  // fetchFirstDestination(responseJson) {
  //   return fetch(responseJson[0])
  // }

  // Change state of variable 'destination'
  setdestination(destination) {
    this.setState(old => ({
      ...old,
      destination,
    }))
  }

  render() {
    // Use curly brackets to retrieve specific items from an object
    const { destination } = this.state

    return (
      // className is used to give the div an id
      <div className="destination">
        <div>
          <p>
            My retrieved destination:
            {destination.name ? destination.name : 'loading...'}
          </p>
        </div>
      </div>
    )
  }
}
