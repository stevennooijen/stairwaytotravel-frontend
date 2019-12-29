import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import DestinationWindow from './DestinationWindow'

const DestinationPin = props => {
  const markerStyle = {
    border: '1px solid white',
    borderRadius: '50%',
    height: 10,
    width: 10,
    backgroundColor: props.show ? 'red' : 'blue',
    cursor: 'pointer',
    zIndex: 10,
  }

  return (
    <Fragment>
      <div style={markerStyle} />
      {props.show && <DestinationWindow place={props.place} />}
    </Fragment>
  )
}

DestinationPin.propTypes = {
  show: PropTypes.bool.isRequired,
  place: PropTypes.shape({
    name: PropTypes.string,
    formatted_address: PropTypes.string,
    rating: PropTypes.number,
    types: PropTypes.array,
    price_level: PropTypes.number,
    opening_hours: PropTypes.object,
  }).isRequired,
}

export default DestinationPin
