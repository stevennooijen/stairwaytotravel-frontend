import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import ReactGA from 'react-ga'

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)
ReactGA.pageview(window.location.pathname + window.location.search)

const appStyles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}

// Actual app component
class App extends Component {
  // Generate GA pageview when route changes
  componentDidMount = () =>
    ReactGA.pageview(window.location.pathname + window.location.search)
  componentDidUpdate = () =>
    ReactGA.pageview(window.location.pathname + window.location.search)

  render() {
    // Use curly brackets to retrieve specific items from an object
    // const { opened } = this.state
    // children are passed in index.js, which are the actual subpages
    const { children } = this.props

    return (
      // className is used to give the div an id
      <div className="App">
        <CssBaseline />
        {children}
      </div>
    )
  }
}

// Apply styling and routing to App
export default withRouter(withStyles(appStyles)(App))
