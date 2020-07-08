import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

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
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
})

class FloatingActionButton extends Component {
  render() {
    const { classes, onClick } = this.props

    return (
      <Fab
        color="primary"
        aria-label="Save your bucket list"
        className={classes.fab}
        onClick={onClick}
        variant="extended"
      >
        <ShoppingCartIcon className={classes.extendedIcon} />
        Checkout
      </Fab>
    )
  }
}

export default withStyles(styles)(FloatingActionButton)
