import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ExploreIcon from '@material-ui/icons/Explore'

class SimpleBottomNavigation extends Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
    // change history programatically when value changes
    // https://stackoverflow.com/questions/48907932/material-ui-app-bar-w-react-router
    this.props.history.push(value)
  }

  render() {
    const { value } = this.state

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        // className is used to give the div an id
        className="bottom nav"
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

export default withRouter(SimpleBottomNavigation)
