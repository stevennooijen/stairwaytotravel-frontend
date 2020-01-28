import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme.js'

import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import { Home } from './pages/home'
import { Explore, DestinationPage } from './pages/explore'
import { Bucketlist } from './pages/bucketlist'
import { About } from './pages/about'

class Root extends React.Component {
  constructor(props) {
    super(props)
    // TODO: eventually pass on this global state through url parameters
    this.state = {
      placeQuery: '',
    }
  }

  savePlaceQuery = place => {
    this.setState({ placeQuery: place })
  }

  render() {
    const { placeQuery } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        {/* Router is not a standard requirement but is added to create links/urls/rounting */}
        <Router>
          <div>
            {/* Start of actual app, App is the top level component */}
            <App>
              <Route
                exact
                path="/"
                render={props => (
                  <Home
                    {...props}
                    placeQuery={placeQuery}
                    savePlaceQuery={this.savePlaceQuery}
                  />
                )}
              />
              <Route
                exact
                path="/explore"
                render={props => (
                  <Explore
                    {...props}
                    placeQuery={placeQuery}
                    savePlaceQuery={this.savePlaceQuery}
                  />
                )}
              />
              <Route path="/explore/:name" component={DestinationPage} />
              <Route path="/bucketlist" render={() => <Bucketlist />} />
              <Route path="/about" render={() => <About />} />
            </App>
          </div>
        </Router>
        ,
      </MuiThemeProvider>
    )
  }
}

// Links it all to index.html
ReactDOM.render(<Root />, document.getElementById('root'))

registerServiceWorker()
