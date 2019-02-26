import React from 'react'
import { Route, Link } from 'react-router-dom'

import { PinkHeader } from 'ui/header'

import ApiCall from './Client'

// way to retrieve the destination from the url and save it in a constant
const DestinationId = ({ name }) => <Link to={`/explore/${name}`}>{name}</Link>

export default ({ match }) => (
  <div>
    {/* Select a destination part */}
    <PinkHeader text="Select destination" />
    <ul>
      <li>
        <DestinationId name="8" />
      </li>
      <li>
        <DestinationId name="0" />
      </li>
    </ul>

    {/* What to do if no destination name in the path */}
    <Route
      exact
      path={`${match.path}/`}
      component={() => <div>Please select someone</div>}
    />
    {/* Return result if destination name in path */}
    <Route
      path={`${match.path}/:name`}
      component={({ match }) => <div>{match.params.name}</div>}
    />

    {/* New part where we call class ApiCall */}
    <ApiCall />
  </div>
)
