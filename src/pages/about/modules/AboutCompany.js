import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'

const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: 'flex',
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    maxWidth: 400,
    // display: 'flex',
    // justifyContent: 'center',
    // backgroundColor: theme.palette.warning.main,
    padding: theme.spacing(8, 3),
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
  },
  imagesWrapper: {
    position: 'relative',
  },
  imageDots: {
    position: 'absolute',
    top: -67,
    left: -67,
    right: 0,
    bottom: 0,
    width: '100%',
    background: 'url(/static/onepirate/productCTAImageDots.png)',
  },
  image: {
    position: 'absolute',
    top: -28,
    left: -28,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: 600,
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
              <Typography variant="h4">Company profile</Typography>
              <Typography gutterBottom>
                Stairway to Travel offers personalized travel recommendations
                that help you shape unique itineraries.
              </Typography>
              <Typography gutterBottom>
                We believe that travel research should be inspiring, fun and
                easy. We do this by giving you highly personalized,
                uncommercial, and trustworthy advice. Also, we aim to surprise
                you with unique destinations that you would otherwise never have
                thought of. All recommendations are based on machine learning
                and natural language processing techniques.
              </Typography>
              <Typography gutterBottom>
                If you have any questions, suggestions or feedback, feel free to
                contact us!
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className={classes.imagesWrapper}>
            <Hidden smDown>
              <div className={classes.imageDots} />
              <img
                src={require('../../../assets/img/me-sailing copy.jpg')}
                alt="call to action"
                className={classes.image}
              />
            </Hidden>
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
