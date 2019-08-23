import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import Card from '@material-ui/core/Card'

const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
  },
  cardWrapper: {
    padding: theme.spacing(8),
  },
  card: {
    // set width and padding equal to width of AboutCompany cards
    width: 400,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3, 3),
  },
  cardContent: {
    margin: theme.spacing(2),
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

class CallToAction extends React.Component {
  state = {
    open: false,
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const { classes } = this.props

    return (
      <Container className={classes.root} component="section" maxWidth={false}>
        <div className={classes.cardWrapper}>
          <Card className={classes.card}>
            <form onSubmit={this.handleSubmit} className={classes.cardContent}>
              <Typography variant="h2" component="h2" gutterBottom>
                Stay in touch
              </Typography>
              <Typography variant="h5">
                Follow the developments and be notified of significant changes.
              </Typography>
              <TextField
                // noBorder
                className={classes.textField}
                placeholder="Your email"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Keep me updated
              </Button>
            </form>
          </Card>
        </div>
        {/* Snackbar message when pressing button */}
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          message="We will send you our best offers, once a week."
        />
      </Container>
    )
  }
}

CallToAction.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CallToAction)