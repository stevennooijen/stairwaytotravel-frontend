import React from 'react'
import { Route, Link } from 'react-router-dom'

import { PinkHeader } from 'ui/header'

const PersonLink = ({ name }) => <Link to={`/about/${name}`}>{name}</Link>

export default ({ match }) => (
  <div>
    <PinkHeader text="About someone" />
    <ul>
      <li>
        <PersonLink name="steven" />
      </li>
      <li>
        <PersonLink name="leon" />
      </li>
    </ul>

    <Route
      exact
      path={`${match.path}/`}
      component={() => <div>Please select someone</div>}
    />
    <Route
      path={`${match.path}/:name`}
      component={({ match }) => <div>{match.params.name}</div>}
    />
  </div>
)
