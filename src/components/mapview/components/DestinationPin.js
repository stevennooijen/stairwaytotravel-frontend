import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import NatureIcon from '@material-ui/icons/Nature'

import DestinationCard from '../../destinationCard/DestinationCard'

const DestinationPin = props => {
  const theme = useTheme()

  const markerStyle = {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '50%',
    // or set width & height to '1.8rem'
    height: 30,
    width: 30,
    padding: 5,
    // Changes when active
    backgroundColor: props.show
      ? `${theme.palette.secondary.main}`
      : `${theme.palette.background.paper}`,
    color: props.show ? 'white' : 'black',
    zIndex: 10,
  }

  const infoWindowStyle = {
    position: 'relative',
    bottom: 280,
    left: '-120px',
    width: 250,
  }

  return (
    <Fragment>
      <NatureIcon style={markerStyle} />
      {props.show && (
        <div style={infoWindowStyle}>
          <DestinationCard
            place={props.place}
            toggleLike={props.toggleLike}
            onClick={() => {
              // send to destination page
              props.history.push('/explore/' + props.place.id)
            }}
          />
        </div>
      )}
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

export default withRouter(DestinationPin)
