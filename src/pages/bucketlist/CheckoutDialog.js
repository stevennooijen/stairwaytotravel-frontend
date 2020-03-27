import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class CheckoutDialog extends Component {
  render() {
    const {
      open,
      textFieldValue,
      handleTextFieldChange,
      handleClose,
      handleSubmit,
    } = this.props

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Booking</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Do you need help with booking this trip? Please share your email
              address so we can reach out to you.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              value={textFieldValue}
              onChange={handleTextFieldChange}
            />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
            <Button type="submit" onClick={handleClose} color="primary">
              Send
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

export default CheckoutDialog
