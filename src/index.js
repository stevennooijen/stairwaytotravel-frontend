import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme.js'

import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import SimpleBottomNavigation from 'components/BottomNavigation'
import { Home } from './pages/home'
import { Explore, DestinationPage } from './pages/explore'
import { Bucketlist } from './pages/bucketlist'
import { About } from './pages/about'

class Root extends React.Component {
  constructor(props) {
    super(props)
    // TODO: eventually pass on this global state through url parameters
    this.state = {
      seed: Math.floor(Math.random() * 100000),
      placeQuery: '',
      mapQuery: null,
      profilesQuery: [],
      likedPlaces: [],
      newLikes: [],
    }
  }

  setNewSeed = () => {
    const newSeed = Math.floor(Math.random() * 100000)
    this.setState({ seed: newSeed })
    return newSeed
  }

  setRootState = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    const {
      seed,
      placeQuery,
      mapQuery,
      profilesQuery,
      likedPlaces,
      newLikes,
    } = this.state
    const newLikesNotificationDot = newLikes.length > 0

    return (
      <MuiThemeProvider theme={theme}>
        {/* Router is not a standard requirement but is added to create links/urls/rounting */}
        <Router>
          <div>
            {/* Start of actual app, App is the top level component */}
            <App>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Home
                      {...props}
                      placeQuery={placeQuery}
                      setRootState={this.setRootState}
                      setNewSeed={this.setNewSeed}
                    />
                  )}
                />
                <Route
                  exact
                  path="/explore"
                  render={props => (
                    <Explore
                      {...props}
                      seed={seed}
                      placeQuery={placeQuery}
                      mapQuery={mapQuery}
                      profilesQuery={profilesQuery}
                      likedPlaces={likedPlaces}
                      newLikes={newLikes}
                      setRootState={this.setRootState}
                      setNewSeed={this.setNewSeed}
                    />
                  )}
                />
                <Route
                  path="/explore/:name"
                  render={props => (
                    <DestinationPage
                      {...props}
                      profilesQuery={profilesQuery}
                      likedPlaces={likedPlaces}
                      newLikes={newLikes}
                      setRootState={this.setRootState}
                    />
                  )}
                />
                <Route
                  exact
                  path="/bucketlist"
                  render={props => (
                    <Bucketlist
                      {...props}
                      likedPlaces={likedPlaces}
                      setRootState={this.setRootState}
                    />
                  )}
                />
                <Route path="/about" render={() => <About />} />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
              <SimpleBottomNavigation
                newLikesNotificationDot={newLikesNotificationDot}
                setRootState={this.setRootState}
              />
            </App>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

// Links it all to index.html
ReactDOM.render(<Root />, document.getElementById('root'))

registerServiceWorker()
