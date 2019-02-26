import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import { Home } from './pages/home'
import DestinationPage from './pages/explore/DestinationPage'
import { Grid } from './pages/bucketlist'

ReactDOM.render(
  // Router is not a standard requirement but is added to create links/urls/rounting
  <Router>
    <div>
      {/* Start of actual app, App is the top level component */}
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/explore" component={DestinationPage} />
        <Route path="/explore/:name" component={DestinationPage} />
        <Route path="/bucketlist" component={Grid} />
      </App>
    </div>
  </Router>,
  // Links it all to index.html
  document.getElementById('root'),
)
registerServiceWorker()
