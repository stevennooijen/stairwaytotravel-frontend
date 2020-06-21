import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ExploreIcon from '@material-ui/icons/Explore'
import Badge from '@material-ui/core/Badge'

// import HideOnScroll from 'components/utils/HideOnScroll'

const PAGES = ['/explore', '/bucketlist']

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
    this.props.history.push(value)
  }

  render() {
    const { location } = this.state
    const { classes, newLikesNotificationDot } = this.props

    // keep only the part before the second backslash: /explore/:name becomes /explore
    const pathRoot = '/' + location.pathname.split('/')[1]
    const queryParams = queryString.parse(location.search)

    return (
      // Show navbar only on some pages
      PAGES.includes(pathRoot) &&
      queryParams.map !== 'true' && (
        // <HideOnScroll>
        <BottomNavigation
          value={pathRoot}
          onChange={this.handleChange}
          showLabels
          className={classes.stickToBottom}
        >
          <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
          <BottomNavigationAction
            label="Explore"
            value="/explore"
            icon={<ExploreIcon />}
          />
          <BottomNavigationAction
            label="Bucket List"
            value="/bucketlist"
            icon={
              <Badge
                color="primary"
                variant="dot"
                invisible={!newLikesNotificationDot}
              >
                <FavoriteBorderIcon />
              </Badge>
            }
          />
        </BottomNavigation>
        // </HideOnScroll>
      )
    )
  }
}

export default withRouter(withStyles(styles)(SimpleBottomNavigation))
