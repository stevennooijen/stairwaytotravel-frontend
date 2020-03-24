import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'

const styles = theme => ({
  fab: {
    position: 'fixed',
    margin: 0,
    top: 'auto',
    bottom: 70,
    // center right
    right: 30,
    // center middle if bigger screen
    [theme.breakpoints.up('sm')]: {
      left: '50%',
      transform: 'translateX(-50%)',
    },
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
