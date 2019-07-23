import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import SearchStepper from './stepper/SearchStepper'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import HeroUnit from './HeroUnit'

const styles = theme => ({
  stepper: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundColor: theme.palette.background.paper,
  },
  footer: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(6),
  },
})

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.stepperRef = React.createRef()
  }

  // state = {
  // Check if previous search result still in sessionStorage, if not set as empty
  // continent: sessionStorage.getItem('continent') || '',
  // }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    sessionStorage.setItem([event.target.name], event.target.value)
  }

  // scrolling function
  scrollToStepper = () => {
    this.stepperRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        {/* Hero unit. Pass along scroller as action for buttons */}
        <HeroUnit scrollTo={this.scrollToStepper} />
        {/* Stepper section, with reference for scrolling to */}
        <Container
          className={classes.stepper}
          maxWidth="md"
          ref={this.stepperRef}
        >
          <SearchStepper />
        </Container>
        {/* Footer */}
        <footer className={classes.footer}>
          {/* <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography> */}
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            © 2019 Stairway.travel
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Home)
