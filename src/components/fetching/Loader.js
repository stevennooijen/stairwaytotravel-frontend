import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  loaderContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
    display: 'flex',
    justifyContent: 'center',
  },
})

class Loader extends Component {
  render() {
    const { classes } = this.props

    return (
      <Container className={classes.loaderContainer}>
        <CircularProgress />
      </Container>
    )
  }
}

export default withStyles(styles)(Loader)
