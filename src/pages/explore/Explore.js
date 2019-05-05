import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import DestinationCard from 'components/destination'

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
    padding: `${theme.spacing.unit * 8}px 0`,
  },
})

class Explore extends Component {
  // introduce a class field that holds the lifecycle state of the component to prevent setState when unmounted
  _isMounted = false

  // Constructor can only be called once to define state
  constructor(props) {
    super(props)
    // Define initial state
    this.state = {
      // destination_id is determined from the url (match is passed through props)
      destination_id: props.match.params.name,
      // destination_data will fill itself with the API data
      destination_data: {},
      // retrieve sessionStorage data from Search tab
      continent: sessionStorage.getItem('continent'),
      // Possibly do something with a loading variable
      // https://facebook.github.io/react-native/docs/network
      // isLoading: true,
    }
  }

  // Pipeline of functions. Result of previous is piped into next function
  componentDidMount() {
    this._isMounted = true
    this.fetchProfile(this.state.destination_id)
      .then(response => response.json())
      // .then(responseJson => this.fetchFirstDestination(responseJson))
      .then(destinationJson => this.setdestination(destinationJson))
      .catch(err => console.log(err))
  }

  // Call an API, API_URL is retrieved from .env files
  fetchProfile(id) {
    // return requested specific destination
    if (id) {
      return fetch(process.env.REACT_APP_API_URL + '/api/' + id)
      // return search as requested by sessionStorage (=Search tab)
    } else if (this.state.continent) {
      return fetch(
        process.env.REACT_APP_API_URL +
          '/api/?continent=' +
          sessionStorage.getItem('continent'),
      )
      // return random destination
    } else {
      return fetch(process.env.REACT_APP_API_URL + '/api/')
    }
  }

  // Change state of variable 'destination_data'
  setdestination(destination_data) {
    // abort the request when your component unmounts to prevent this.setState() on an unmounted component.
    if (this._isMounted) {
      this.setState(old => ({
        ...old,
        destination_data,
      }))
    }
  }

  componentWillUnmount() {
    this._isMounted = false
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
          <DestinationCard
            title={
              this.state.destination_data.name
                ? this.state.destination_data.name
                : 'loading...'
            }
            image={require('../../assets/beach.jpg')}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Explore)
