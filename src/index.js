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
import { Grid } from './pages/bucketlist'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    {/* Router is not a standard requirement but is added to create links/urls/rounting */}
    <Router>
      <div>
        {/* Start of actual app, App is the top level component */}
        <App>
          <Route exact path="/" component={Home} />
          <Route exact path="/explore" component={Explore} />
          <Route path="/explore/:name" component={Explore} />
          <Route path="/bucketlist" component={Grid} />
        </App>
      </div>
    </Router>
    ,
  </MuiThemeProvider>,

  // Links it all to index.html
  document.getElementById('root'),
)
registerServiceWorker()
