import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'

const styles = theme => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 30,
    bottom: 70,
    left: 'auto',
    position: 'fixed',
  },
})

class FloatingActionButton extends Component {
  render() {
    const { classes } = this.props

    return (
      <Fab color="primary" aria-label="book it" className={classes.fab}>
        <FlightTakeoffIcon />
      </Fab>
    )
  }
}

export default withStyles(styles)(FloatingActionButton)
