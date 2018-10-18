import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

export default () => (
  <div>
    <header className="App-header">
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <Button component={Link} to="/grid" variant="contained" color="primary">
      Hello World
    </Button>
  </div>
)
