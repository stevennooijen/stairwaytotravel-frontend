import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import { Home } from './pages/home'
import { About } from './pages/about'
import { Grid } from './pages/grid'

ReactDOM.render(
  <Router>
    <div>
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/grid" component={Grid} />
      </App>
    </div>
  </Router>,
  document.getElementById('root'),
)
registerServiceWorker()
