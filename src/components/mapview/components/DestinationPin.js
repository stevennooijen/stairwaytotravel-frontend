import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
// import { useTheme } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import NatureIcon from '@material-ui/icons/Nature'

import DestinationCard from '../../destinationCard/DestinationCard'

const styles = theme => ({
  markerStyle: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '50%',
    // or set width & height to '1.8rem'
    height: 30,
    width: 30,
    padding: 5,
    // Changes when active
    // backgroundColor: this.props.show
    //   ? `${theme.palette.secondary.main}`
    //   : `${theme.palette.background.paper}`,
    // color: this.props.show ? 'white' : 'black',
    backgroundColor: `${theme.palette.secondary.main}`,
    color: 'white',
    zIndex: 10,
  },
  infoWindowStyle: {
    // position: 'relative',
    bottom: 280,
    left: '-120px',
    // width: 250,
    position: 'relative',
    // top: -400,
    // left: -200,
    width: 380,
    // left: '50%',
    // top: '50%',
    // transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('xs')]: {
      width: 250,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
})

const DestinationPin = props => {
  const { classes } = props

  return (
    <Fragment>
      <NatureIcon className={classes.markerStyle} />
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

export default withRouter(withStyles(styles)(DestinationPin))
