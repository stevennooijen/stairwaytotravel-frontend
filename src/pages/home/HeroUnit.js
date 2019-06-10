import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import HeroUnitLayout from './HeroUnitLayout'
// import RedirectButton from '../../components/RedirectButton'

const backgroundImage = require('../../assets/stairways/beach.jpeg')
//   'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80'
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
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
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
  const { classes } = props

  return (
    <HeroUnitLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="" />
      {/* load logo. Keep it in a box to constrain width */}
      <div className={classes.logoDiv}>
        <img
          src={logoImage}
          alt="Logo Stairway.travel"
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
        variant="contained"
        color="primary"
        onClick={() => {
          sessionStorage.clear()
        }}
        size="large"
      >
        Search random!
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Or...
      </Typography>
      <Button
        color="inherit"
        variant="outlined"
        size="large"
        // create scroller: https://stackoverflow.com/questions/54245395/how-can-i-scroll-to-a-div-onclick-using-react
        // create scroller: https://stackoverflow.com/questions/41692785/scroll-page-to-the-nested-react-component-on-a-button-click
        // create scroller: https://stackoverflow.com/questions/49831378/react-scroll-to-component
        // onClick={this.refs.stepper.scrollIntoView()}
        // component="a"
        // href="/premium-themes/onepirate/sign-up/"
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
