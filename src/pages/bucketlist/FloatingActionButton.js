import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import NavigationIcon from '@material-ui/icons/Navigation'

const styles = theme => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 30,
    bottom: 70,
    left: 'auto',
    position: 'fixed',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
})

class FloatingActionButton extends Component {
  render() {
    const { classes } = this.props

    return (
      <Fab variant="extended" className={classes.fab}>
        <NavigationIcon className={classes.extendedIcon} />
        Navigate
      </Fab>
    )
  }
}

export default withStyles(styles)(FloatingActionButton)
