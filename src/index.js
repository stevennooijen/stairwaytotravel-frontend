import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme.js'

import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import { Home } from './pages/home'
import { Explore } from './pages/explore'
import { Bucketlist } from './pages/bucketlist'
import { About } from './pages/about'
import { Mapview } from './pages/mapview'

class Root extends React.Component {
  constructor(props) {
    super(props)

    // define at root level as it is used in multiple lower level components
    this.state = {
      placename: '',
    }
  }

  addPlace = place => {
    // this.setState({ placename: place })
    this.setState({ placename: place.target.value })
    // TODO: remove, is inserted for demo purposes
    console.log(this.state.placename)
  }

  render() {
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
                    // pass on global state to this component
                    placename={this.state.placename}
                    addPlace={this.addPlace}
                  />
                )}
              />
              <Route exact path="/explore" render={() => <Explore />} />
              <Route path="/explore/:name" render={() => <Explore />} />
              <Route path="/bucketlist" render={() => <Bucketlist />} />
              <Route path="/about" render={() => <About />} />
              <Route
                path="/mapview"
                render={props => (
                  <Mapview
                    {...props}
                    // pass on global state to this component
                    placename={this.state.placename}
                    addPlace={this.addPlace}
                  />
                )}
              />
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
