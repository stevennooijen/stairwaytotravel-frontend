import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    top: theme.spacing(10),
    zIndex: 200,
    // align in the middle
    left: '50%',
    transform: 'translate(-50%)',
  },
}))

export default function FloatingActionButtons(props) {
  const classes = useStyles()

  return (
    <Fab
      variant="extended"
      color="secondary"
      size="small"
      className={classes.fab}
      onClick={props.onClick}
    >
      {props.children}
    </Fab>
  )
}
