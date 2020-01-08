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

import GoogleMapReact from 'google-map-react'

class Root extends React.Component {
  constructor(props) {
    super(props)

    // define at root level as it is used in multiple lower level components
    this.state = {
      placeQuery: '',

      // for the searchbox
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
    }
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    })
  }

  savePlaceQuery = place => {
    this.setState({ placeQuery: place })
    // this.setState({ placeQuery: place.target.value })
    // TODO: remove, is inserted for demo purposes
    console.log('global state', this.state.placeQuery)
    console.log('global location', this.state.placeQuery.geometry.location)
    // console.log('this', this.state.placeQuery.formatted_address)
  }

  render() {
    const { placeQuery, mapApiLoaded, mapInstance, mapApi } = this.state

    return (
      <MuiThemeProvider theme={theme}>
        {/* Load maps API first with some random center and zoom */}
        <GoogleMapReact
          defaultCenter={[34.0522, -118.2437]}
          defaultZoom={10}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_MAP_KEY,
            libraries: ['places', 'geometry'],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        />
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
                    placeQuery={placeQuery}
                    savePlaceQuery={this.savePlaceQuery}
                    mapApiLoaded={mapApiLoaded}
                    mapInstance={mapInstance}
                    mapApi={mapApi}
                  />
                )}
              />
              <Route
                exact
                path="/explore"
                render={props => (
                  <Explore
                    {...props}
                    // pass on global state to this component
                    placeQuery={placeQuery}
                    savePlaceQuery={this.savePlaceQuery}
                    mapApiLoaded={mapApiLoaded}
                    mapInstance={mapInstance}
                    mapApi={mapApi}
                  />
                )}
              />
              <Route path="/explore/:name" render={() => <Explore />} />
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
