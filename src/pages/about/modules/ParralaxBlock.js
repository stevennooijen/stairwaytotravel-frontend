import React from 'react'
import { Parallax } from 'react-parallax'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '500px',
  },
  insideStyles: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  text: {
    // keep distance between buttons
    margin: theme.spacing(2),
  },
})

function ParallaxBlock(props) {
  const { classes } = props

  return (
    <div>
      {/* -----basic config-----*/}
      <Parallax
        bgImage={props.imageUrl}
        // TODO: in future add alt texts to each image
        // bgImageAlt={props.imageAlt}
        strength={200}
      >
        <div className={classes.container}>
          <div className={classes.insideStyles}>
            <Button
              color="inherit"
              variant="outlined"
              size="large"
              //   onClick={scrollTo}
            >
              Specify wishes
            </Button>
            <Typography
              variant="body2"
              color="inherit"
              className={classes.text}
            >
              Or...
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
          </div>
        </div>
      </Parallax>
    </div>
  )
}

export default withStyles(styles)(ParallaxBlock)
