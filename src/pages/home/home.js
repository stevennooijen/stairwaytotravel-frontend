import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import SearchStepper from './stepper/SearchStepper'
import Typography from '@material-ui/core/Typography'
// import Container from '@material-ui/core/Container'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
  },
})

class Home extends React.Component {
  state = {
    // Check if previous search result still in sessionStorage, if not set as empty
    continent: sessionStorage.getItem('continent') || '',
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    sessionStorage.setItem([event.target.name], event.target.value)
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        {/* // <Container maxWidth="sm"> */}
        <div className={classes.root}>
          <Typography gutterBottom variant="title" component="h1">
            Welcome to stairway.travel
          </Typography>
          <Typography>
            To get started, choose which continent you want to go to and click{' '}
            <code>search!</code>.
          </Typography>
          <Button
            component={Link}
            to="/explore"
            variant="contained"
            color="primary"
            onClick={() => {
              sessionStorage.clear()
            }}
          >
            Search random!
          </Button>
        </div>
        {/* </Container> */}
        {/* <Container maxWidth="sm"> */}
        <SearchStepper />
        {/* </Container> */}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Home)
