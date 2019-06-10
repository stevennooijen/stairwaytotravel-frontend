import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import SimpleBottomNavigation from 'components/appbar'

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
  render() {
    // Use curly brackets to retrieve specific items from an object
    // const { opened } = this.state
    // children are passed in index.js, which are the actual subpages
    const { children } = this.props

    return (
      // className is used to give the div an id
      <div className="App">
        {children}
        <SimpleBottomNavigation />
      </div>
    )
  }
}

// Apply styling and routing to App
export default withRouter(withStyles(appStyles)(App))
