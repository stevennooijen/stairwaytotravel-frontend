import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import NatureIcon from '@material-ui/icons/Nature'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import PlaceIcon from '@material-ui/icons/Place'

import DestinationCard from '../../destinationCard/DestinationCard'

const useStyles = makeStyles(theme => ({
  markerStyle: props => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '50%',
    // or set width & height to '1.8rem'
    height: 30,
    width: 30,
    padding: 5,
    // Changes when liked
    backgroundColor: props.place.liked
      ? `${theme.palette.secondary.main}`
      : `${theme.palette.background.paper}`,
    color: props.place.liked ? 'white' : 'black',
    zIndex: 10,
  }),
  infoWindowStyle: {
    // Make sure destinationPins don't show through the Card
    position: 'absolute',
    zIndex: 20,
    // for now position in middle of screen
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    // adapt size of info window based on screen size
    width: 400,
    [theme.breakpoints.only('sm')]: {
      width: 325,
    },
    [theme.breakpoints.down('xs')]: {
      width: 250,
    },
  },
}))

const DestinationPin = props => {
  const classes = useStyles(props)

  return (
    <Fragment>
      {props.place.type === 'park' ? (
        <NatureIcon className={classes.markerStyle} />
      ) : ['guide', 'star'].includes(props.place.status) ? (
        <LocationCityIcon className={classes.markerStyle} />
      ) : (
        <PlaceIcon className={classes.markerStyle} />
      )}
      {props.show && (
        <div className={classes.infoWindowStyle}>
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
