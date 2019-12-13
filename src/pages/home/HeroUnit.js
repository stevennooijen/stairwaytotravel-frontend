import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import HeroUnitLayout from './HeroUnitLayout'

const backgroundImage = require('../../assets/img/used/beach-blur-boardwalk.jpg')

const logoImage = require('../../assets/logos/logo-white.png')

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(8),
      marginRight: theme.spacing(8),
    },
  },
  more: {
    margin: theme.spacing(2),
  },
  logoDiv: {
    width: '50%',
    minWidth: 150,
    maxWidth: 400,
  },
  logo: {
    width: '100%',
  },
})

function ProductHero(props) {
  const { classes, scrollTo } = props

  return (
    <HeroUnitLayout
      backgroundClassName={classes.background}
      scrollTo={scrollTo}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="A boardwalk leading to a lake with a sunset view"
      />
      {/* load logo. Keep it in a box to constrain width */}
      <div className={classes.logoDiv}>
        <img
          src={logoImage}
          alt="Logo Stairway to Travel"
          className={classes.logo}
        />
      </div>

      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Create your personalized travel itinerary
      </Typography>
      <Button
        component={Link}
        to="/explore"
        variant="outlined"
        color="inherit"
        onClick={() => {
          sessionStorage.clear()
        }}
        size="large"
      >
        Search random!
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        OR...
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={scrollTo}
      >
        Specify wishes
      </Button>
    </HeroUnitLayout>
  )
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProductHero)
