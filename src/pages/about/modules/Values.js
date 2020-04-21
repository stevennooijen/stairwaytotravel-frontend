import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import PersonalizedIcon from '@material-ui/icons/SentimentSatisfiedAlt'
import UniqueIcon from '@material-ui/icons/TouchApp'
import UnbiasedIcon from '@material-ui/icons/Visibility'

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: 0,
    marginBottom: theme.spacing(10),
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
  title: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(8),
  },
  image: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    color: theme.palette.secondary.main,
  },
})

function ProductValues(props) {
  const { classes } = props

  return (
    <Container className={classes.root} component="section" maxWidth={false}>
      <Typography
        variant="h2"
        marked="center"
        className={classes.title}
        component="h2"
      >
        Our values
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <Typography variant="h3">Personalized</Typography>
            <PersonalizedIcon fontSize="large" className={classes.image} />
            <Typography>
              We turn the travel industry upside down and ask you what
              <b> you </b>
              want to do instead of boring you with off-the-shelf offers.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <Typography variant="h3">Unique</Typography>
            <UniqueIcon fontSize="large" className={classes.image} />
            <Typography>
              We don't recommend the obvious, but help you find something truly
              special.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={classes.item}>
            <Typography variant="h3">Unbiased</Typography>
            <UnbiasedIcon fontSize="large" className={classes.image} />
            <Typography>
              We believe in transparancy and want to provide unbiased advice.
              There is no hidden agenda.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProductValues)
