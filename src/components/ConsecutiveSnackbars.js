import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
  snackbar: {
    bottom: 60,
    zIndex: 99,
  },
}))

function TransitionUp(props) {
  return <Slide {...props} direction="up" />
}

export default function ConsecutiveSnackbars(props) {
  const [snackPack, setSnackPack] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [messageInfo, setMessageInfo] = React.useState(undefined)

  React.useEffect(
    () => {
      if (snackPack.length && !messageInfo) {
        // Set a new snack when we don't have an active one
        setMessageInfo({ ...snackPack[0] })
        setSnackPack(prev => prev.slice(1))
        setOpen(true)
      } else if (snackPack.length && messageInfo && open) {
        // Close an active snack when a new one is added
        setOpen(false)
      }
    },
    [snackPack, messageInfo, open],
  )

  React.useEffect(
    () => {
      function handleClick(message) {
        setSnackPack(prev => [...prev, { message, key: new Date().getTime() }])
      }
      if (props.snackbarMessage) handleClick(props.snackbarMessage)
    },
    [props.snackbarMessage],
  )

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  const classes = useStyles()
  return (
    <div>
      <Snackbar
        className={classes.snackbar}
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
        TransitionComponent={TransitionUp}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => props.handleUndo()}
          >
            UNDO
          </Button>
        }
      />
    </div>
  )
}
