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
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(8),
  },
  image: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: theme.palette.secondary.main,
  },
})

function ProductHowItWorks(props) {
  const { classes } = props

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant="h2"
          marked="center"
          className={classes.title}
          component="h2"
        >
          How it works
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Typography variant="h3">1. Personalize</Typography>
              <SearchIcon className={classes.image} fontSize="large" />
              <Typography>
                You know <em>what</em> you want to do, but you don’t know{' '}
                <em>where</em> you can do it? Set your personal travel
                preferences and we will match your wishes with 20.000 travel
                destinations around the world.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Typography variant="h3">2. Explore</Typography>
              <ExploreIcon className={classes.image} fontSize="large" />
              <Typography>
                Discover your destinations in detail and become excited. Take
                into account weather, activities, prices, flights, and more.
                Find places you have never heard of before, but are exactly what
                you are looking for.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Typography variant="h3">3. Decide</Typography>
              <FavoriteIcon className={classes.image} fontSize="large" />
              <Typography>
                Reconsider your liked destinations, and finalise your bucket
                list. You can let us know if you need help with booking it. If
                not, no worries, we hope you have composed your dream trip!
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProductHowItWorks)
