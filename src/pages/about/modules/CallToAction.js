import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import Card from '@material-ui/core/Card'
import ReactGA from 'react-ga'

const styles = theme => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
  },
  card: {
    // set width and margin equal to width of AboutCompany cards
    maxWidth: 400,
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(10, 2),
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
    textFieldValue: '',
  }

  handleTextFieldChange = event => {
    this.setState({
      textFieldValue: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    // Call signup endpoint that then calls the Mailchimp server
    fetch(
      process.env.REACT_APP_API_URL +
        '/signup/?email=' +
        this.state.textFieldValue,
      {
        method: 'POST',
      },
    )
    // TODO: maybe return error message if POST not succesfull?
    // .then(response => response.json())
    // .catch(err => console.log(err))

    this.setState({
      open: true,
    })

    // send google analytics event for the click
    ReactGA.event({
      category: 'Acquisition',
      action: 'Signup',
      label: 'Signup for email updates',
      value: 5,
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
              value={this.state.textFieldValue}
              onChange={this.handleTextFieldChange}
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
        {/* Snackbar message when pressing button */}
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          message="Thank you! We will keep you updated."
        />
      </Container>
    )
  }
}

CallToAction.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CallToAction)
