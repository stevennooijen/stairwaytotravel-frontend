import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LocationOnIcon from '@material-ui/icons/LocationOn'

class SimpleBottomNavigation extends Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
    // console.log(value)
    this.props.history.push(value)
  }

  render() {
    const { classes } = this.props
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
          // Use link component with to attribute to change url
          //   component={Link}
          //   to="/"
          label="Home"
          value="/"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          //   component={Link}
          //   to="/about"
          label="About"
          value="/about"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          //   component={Link}
          //   to="/grid"
          label="Grid"
          value="/grid"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    )
  }
}

export default withRouter(SimpleBottomNavigation)
