import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ExploreIcon from '@material-ui/icons/Explore'

// definieer 1 javaobject = statisch ding kan je niks aan veranderen
// const styles = {
// is nu ineens een functie die aangeroepen kan worden en in dit stukje code kan je dan theme gebruiken als variabele
// nu kan je theme. gebruiken in de functie
const styles = theme => ({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'white',
    borderTopWidth: 0,
    // shadowOffset: { width: 10, height: 50 },
    // boxShadow: '5px 10px',
    shadowColor: 'black',
    shadowOpacity: 1.0,
    elevation: 5,
  },
})

class SimpleBottomNavigation extends Component {
  state = {
    value: this.props.location.pathname,
  }

  // Update state in case the url changes due to a link from /home
  componentWillReceiveProps(newProps) {
    const { pathname } = newProps.location

    this.setState({
      value: pathname,
    })
  }

  handleChange = (event, value) => {
    this.setState({ value })
    // change history programatically when value changes
    // https://stackoverflow.com/questions/48907932/material-ui-app-bar-w-react-router
    this.props.history.push(value)
  }

  render() {
    const { value } = this.state
    const { classes } = this.props

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        // className is used to give the div an id
        className={classes.stickToBottom}
      >
        <BottomNavigationAction
          label="Search"
          value="/"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Explore"
          value="/explore"
          icon={<ExploreIcon />}
        />
        <BottomNavigationAction
          label="Bucket List"
          value="/bucketlist"
          icon={<FavoriteIcon />}
        />
      </BottomNavigation>
    )
  }
}

export default withRouter(withStyles(styles)(SimpleBottomNavigation))
