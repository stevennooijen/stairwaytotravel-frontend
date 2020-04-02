import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import CheckboxGroup from './CheckboxGroup'

class CheckoutDialog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checkboxError: true,
    }
  }

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
        <DialogTitle id="form-dialog-title">Vamos, let's go!</DialogTitle>
        <form
          onSubmit={event => {
            handleSubmit(event)
            this.setState({
              checkboxError: true,
            })
          }}
        >
          <DialogContent dividers>
            <DialogContentText>
              To receive a copy of your bucket list, please share your email
              address. Don't worry, it is not used for email marketing.
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
          <DialogContent dividers>
            <DialogContentText>
              Also, do you need help with booking this trip? Check all that
              apply.
            </DialogContentText>
            <CheckboxGroup
              setCheckboxError={value => {
                this.setState({
                  checkboxError: value,
                })
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose()
                this.setState({
                  checkboxError: true,
                })
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              // make sure this is enable when forms are filled in
              disabled={this.state.checkboxError || textFieldValue === ''}
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
