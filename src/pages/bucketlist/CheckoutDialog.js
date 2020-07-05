import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'

import CheckboxGroup from './CheckboxGroup'

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
      // props for email form
      textFieldValue,
      handleTextFieldChange,
      // props for checkbox form
      checkboxError,
    } = this.props

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Save your bucket list</DialogTitle>
        <Divider variant="middle" />
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Fill in your email address to receive a copy of your bucket list.
              Don't worry, it will not be used for email marketing.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Your Email Address"
              type="email"
              fullWidth
              value={textFieldValue}
              onChange={handleTextFieldChange}
            />
          </DialogContent>
          <Divider variant="middle" />
          <DialogContent>
            <DialogContentText>
              Do you need help with booking this trip? Check all that apply.
            </DialogContentText>
            <CheckboxGroup
              // pass on props for the checkboxes in the dialog
              {...this.props}
            />
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
              // make sure this is enable when forms are filled in
              disabled={checkboxError || textFieldValue === ''}
            >
              Send
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

export default CheckoutDialog
