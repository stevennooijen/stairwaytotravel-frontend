import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import SearchIcon from '@material-ui/icons/Search'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ExploreIcon from '@material-ui/icons/Explore'

const styles = theme => ({
  root: {
    display: 'flex',
    // backgroundColor: theme.palette.secondary.light,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  //   curvyLines: {
  //     pointerEvents: 'none',
  //     position: 'absolute',
  //     top: -180,
  //     opacity: 0.7,
  //   },
  button: {
    marginTop: theme.spacing(8),
  },
})

function ProductHowItWorks(props) {
  const { classes } = props

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1. Personalize</div>
                <SearchIcon className={classes.image} />
                <Typography variant="h5" align="center">
                  You know <em>what</em> you want to do, but you don’t know{' '}
                  <em>where</em> you can do it? Set your personal travel
                  preferences and find your ideal holiday destination.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2. Explore</div>
                <ExploreIcon className={classes.image} />
                <Typography variant="h5" align="center">
                  We match your wishes with 20&nbsp;000 travel destinations
                  around the world. Take into account weather, activities,
                  prices, flights, and more.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3. Decide</div>
                <FavoriteIcon className={classes.image} />
                <Typography variant="h5" align="center">
                  Discover your destinations in detail and become excited. Find
                  places you've never heard of before, but are exactly what
                  you’re looking for.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  )
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProductHowItWorks)
