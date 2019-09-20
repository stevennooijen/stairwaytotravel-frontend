import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme.js'

import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import { Home } from './pages/home'
// import { Explore } from './pages/explore'
// import { Bucketlist } from './pages/bucketlist'
// import { About } from './pages/about'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    {/* Router is not a standard requirement but is added to create links/urls/rounting */}
    <Router>
      <div>
        {/* Start of actual app, App is the top level component */}
        <App>
          <Route exact path="/" render={() => <Home />} />
          {/* <Route exact path="/explore" render={() => <Explore />} /> */}
          {/* <Route path="/explore/:name" render={() => <Explore />} /> */}
          {/* <Route path="/bucketlist" render={() => <Bucketlist />} /> */}
          {/* <Route path="/about" render={() => <About />} /> */}
        </App>
      </div>
    </Router>
    ,
  </MuiThemeProvider>,

  // Links it all to index.html
  document.getElementById('root'),
)
registerServiceWorker()
