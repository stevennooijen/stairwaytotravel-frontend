import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ExploreIcon from '@material-ui/icons/Explore'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import Badge from '@material-ui/core/Badge'

// Taken from hidden app-bar example: https://material-ui.com/components/app-bar/
function HideOnScroll(props) {
  const { children, location } = props
  const trigger = useScrollTrigger()
  const pages = ['/', '/about']
  const queryParams = queryString.parse(location.search)

  return (
    <Slide
      appear={false}
      direction="up"
      // make sure appbar doesn't display when on top of certain pages, or when map is open
      in={
        pages.includes(location.pathname) ||
        (queryParams.map === 'true' && window.pageYOffset === 0)
          ? false
          : !trigger
      }
    >
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
}

// definieer 1 javaobject = statisch ding kan je niks aan veranderen
// const styles = {
// is nu ineens een functie die aangeroepen kan worden en in dit stukje code kan je dan theme gebruiken als variabele
// nu kan je theme. gebruiken in de functie
const styles = theme => ({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    // posssibly, set through theme: theme.palette.background.default
    // backgroundColor: '#fcfcfc',
    borderTop: `1px solid ${theme.palette.divider}`,
    // elevation required for nabar on mobile to pop up above browser navbar
    elevation: 5,
    zIndex: 100,
  },
})

class SimpleBottomNavigation extends Component {
  state = {
    location: this.props.location,
  }

  // Update state in case the url changes due to a link from /home
  componentWillReceiveProps(newProps) {
    this.setState({
      location: newProps.location,
    })
  }

  handleChange = (event, value) => {
    this.setState({ value })
    // change history programatically when value changes
    // https://stackoverflow.com/questions/48907932/material-ui-app-bar-w-react-router
    this.props.history.push(value)
    // Make sure notification dot for new likes is set to false after visiting bucketlist
    if (value === '/bucketlist') {
      this.props.setRootState('newLike', false)
    }
  }

  render() {
    const { location } = this.state
    const { classes, newLike } = this.props

    return (
      // Add transition on the navbar
      <HideOnScroll location={location}>
        <BottomNavigation
          value={location.pathname}
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
            icon={
              <Badge color="primary" variant="dot" invisible={!newLike}>
                <FavoriteBorderIcon />
              </Badge>
            }
          />
        </BottomNavigation>
      </HideOnScroll>
    )
  }
}

export default withRouter(withStyles(styles)(SimpleBottomNavigation))
