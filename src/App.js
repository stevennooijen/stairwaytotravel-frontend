import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'react-emotion'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import MenuIcon from '@material-ui/icons/Menu'
import InboxIcon from '@material-ui/icons/Inbox'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

// Emotion: Component to style main div
const Content = styled('div')({
  padding: '0 15px',
})

const appStyles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}

// Emotion: Component to style an icon button
const StyledIconButton = styled(IconButton)({
  marginLeft: -12,
  marginRight: 20,
})

const StyledListItem = styled(ListItem)({
  width: 250,
})

// Actual app component
class App extends Component {
  // Constructor can only be called once to define state
  constructor(props) {
    super(props)

    // Define initial state
    this.state = {
      opened: false,
      vehicle: {},
    }
  }

  // Function to change state of variable 'opened'
  toggleDrawer() {
    this.setState(old => ({
      opened: old.opened ? false : true,
    }))
  }

  // Pipeline of functions. Result of previous is piped into next function
  componentDidMount() {
    this.fetchProfile()
      .then(res => res.json())
      .then(person => this.fetchFirstVehicle(person))
      .then(res => res.json())
      .then(vehicle => this.setVehicle(vehicle))
      .catch(err => console.log(err))
  }

  // Call an API
  fetchProfile() {
    return fetch('https://swapi.co/api/people/1')
  }

  // Retrieve info from JSON
  fetchFirstVehicle(person) {
    return fetch(person.vehicles[0])
  }

  // Change state of variable 'vehicle'
  setVehicle(vehicle) {
    this.setState(old => ({
      ...old,
      vehicle,
    }))
  }

  render() {
    // Use curly brackets to retrieve specific items from an object
    const { opened, vehicle } = this.state
    const { children, classes, history } = this.props

    return (
      // className is used to give the div an id
      <div className="App">
        <Drawer open={opened} onClose={() => this.toggleDrawer()}>
          <div tabIndex={0} role="button" onClick={() => this.toggleDrawer()}>
            <div>
              <List>
                <StyledListItem button onClick={() => history.push('/')}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </StyledListItem>
                <StyledListItem button onClick={() => history.push('/about')}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="About" />
                </StyledListItem>
                <StyledListItem button onClick={() => history.push('/grid')}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Grid" />
                </StyledListItem>
              </List>
            </div>
          </div>
        </Drawer>
        <AppBar position="static">
          <Toolbar>
            <StyledIconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => this.toggleDrawer()}
            >
              <MenuIcon />
            </StyledIconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.grow}
            >
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Content>
          <p>My nice vehicle: {vehicle.name ? vehicle.name : 'loading...'}</p>
          {children}
        </Content>
      </div>
    )
  }
}

// Apply styling and routing to App
export default withRouter(withStyles(appStyles)(App))
