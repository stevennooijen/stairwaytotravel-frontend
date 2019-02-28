import React, { Component } from 'react'
import Destination from './Destination'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
    padding: `${theme.spacing.unit * 8}px 0`,
  },
})

class Explore extends Component {
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
    const { classes } = this.props

    return (
      <React.Fragment>
        <div className={classes.heroUnit}>
          {/* Single line for printing the destination id retrieved from the url */}
          {/* <p>destination id = {this.state.destination_id}</p> */}
          <Destination
            destinationName={
              this.state.destination_data.name
                ? this.state.destination_data.name
                : 'loading...'
            }
          />
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Explore)
