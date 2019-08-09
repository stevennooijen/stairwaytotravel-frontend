import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    maxWidth: 400,
    padding: theme.spacing(2, 3),
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  imageContainer: {
    maxHeight: 360,
    overflow: 'hidden',
    borderRadius: '2%',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
  },
  imageSubtitle: {
    textAlign: 'center',
  },
})

class AboutCompany extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <Container className={classes.root} component="section">
        <Grid container>
          <Grid item xs={12} md={6} className={classes.cardWrapper}>
            <div className={classes.card}>
              <Typography variant="h4" paragraph>
                Company profile
              </Typography>
              <Typography paragraph>
                Stairway to Travel offers personalized travel recommendations
                that help you shape unique itineraries.
              </Typography>
              <Typography paragraph>
                We believe that travel research should be inspiring, fun and
                easy. We do this by giving you highly personalized,
                uncommercial, and trustworthy advice. Also, we aim to surprise
                you with unique destinations that you would otherwise never have
                thought of. All recommendations are based on machine learning
                and natural language processing techniques.
              </Typography>
              <Typography paragraph>
                If you have any questions, suggestions or feedback, feel free to
                contact us!
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className={classes.cardWrapper}>
            <div className={classes.card}>
              <div className={classes.imageContainer}>
                <img
                  src={require('../../../assets/img/me-sailing copy 4.jpg')}
                  alt="call to action"
                  className={classes.image}
                />
              </div>
              <Typography className={classes.imageSubtitle} variant="subtitle1">
                Steven Nooijen - Founder - Bio
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

AboutCompany.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AboutCompany)
