import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import NatureIcon from '@material-ui/icons/Nature'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import PlaceIcon from '@material-ui/icons/Place'

const useStyles = makeStyles(theme => ({
  markerStyle: props => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '50%',
    // or set width & height to '1.8rem'
    height: 30,
    width: 30,
    padding: 5,
    // position icon on top of geolocation
    position: 'absolute',
    left: -15,
    top: -15,
    // Changes when liked
    backgroundColor: props.isLiked
      ? `${theme.palette.primary.main}`
      : `${theme.palette.background.paper}`,
    color: props.isLiked ? 'white' : 'black',
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
      {props.placeType === 'park' ? (
        <NatureIcon className={classes.markerStyle} />
      ) : ['guide', 'star'].includes(props.placeStatus) ? (
        <LocationCityIcon className={classes.markerStyle} />
      ) : (
        <PlaceIcon className={classes.markerStyle} />
      )}
      {props.show && (
        <div className={classes.infoWindowStyle}>{props.children}</div>
      )}
    </Fragment>
  )
}

export default withRouter(DestinationPin)
