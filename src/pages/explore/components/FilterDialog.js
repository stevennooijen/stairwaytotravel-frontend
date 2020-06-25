import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'

class CheckoutDialog extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const {
      open,
      handleClose,
      handleSubmit,
      submitDisabled,
      children,
    } = this.props

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Activity filters</DialogTitle>
        <Divider variant="middle" />
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              What type of holiday are you looking for?
            </DialogContentText>
            {children}
          </DialogContent>
          <Divider variant="middle" />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={submitDisabled}
            >
              Show places
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

export default CheckoutDialog
