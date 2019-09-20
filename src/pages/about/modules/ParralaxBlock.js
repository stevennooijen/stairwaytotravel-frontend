import React from 'react'
import { Parallax } from 'react-parallax'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import { Link } from 'react-router-dom'

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '500px',
    // for the text and color of the buttons inside the container
    color: theme.palette.common.white,
  },
  // the overlay shades the parralax in the background
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.3,
  },
  insideStyles: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    // this causes the text between buttons to lay on top of the overlay
    zIndex: 1,
  },
  text: {
    // keep distance between buttons
    margin: theme.spacing(2),
  },
})

function ParallaxBlock(props) {
  const { classes, scrollTo, buttonText } = props

  return (
    <div>
      {/* -----basic config-----*/}
      <Parallax
        bgImage={props.imageUrl}
        bgImageAlt={props.imageAlt}
        strength={400}
      >
        <div className={classes.overlay} />
        <div className={classes.container}>
          <div className={classes.insideStyles}>
            {/* <Button
              component={Link}
              to="/explore"
              variant="outlined"
              color="inherit"
              onClick={() => {
                sessionStorage.clear()
              }}
              size="large"
            >
              Explore random
            </Button>
            <Typography
              variant="body2"
              color="inherit"
              className={classes.text}
            >
              OR...
            </Typography> */}
            <Button
              // component={Link}
              // to="/"
              color="primary"
              variant="contained"
              size="large"
              onClick={scrollTo}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </Parallax>
    </div>
  )
}

export default withStyles(styles)(ParallaxBlock)
