import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
// import Typography from '../components/Typography'
import Typography from '@material-ui/core/Typography'

import SearchIcon from '@material-ui/icons/Search'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ExploreIcon from '@material-ui/icons/Explore'

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    display: 'flex',
    position: 'relative',
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
  //   image: {
  //     height: 55,
  //   },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
})

function ProductValues(props) {
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
          Our Mission
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <SearchIcon fontSize="large" />
              <Typography variant="h6" className={classes.title}>
                Personalized
              </Typography>
              <Typography variant="h5">
                We listen to you, and you only. Customer first is important to
                us.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <ExploreIcon fontSize="large" />

              <Typography variant="h6" className={classes.title}>
                Unique
              </Typography>
              <Typography variant="h5">
                We don't recommend the obvious, but help you find ssomething
                special
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <FavoriteIcon fontSize="large" />
              <Typography variant="h6" className={classes.title}>
                Unbiased
              </Typography>
              <Typography variant="h5">
                We are here for you. Recommendations for travellers by
                travellers
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProductValues)
