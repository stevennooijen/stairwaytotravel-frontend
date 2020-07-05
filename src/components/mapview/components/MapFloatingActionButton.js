import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import RefreshIcon from '@material-ui/icons/Refresh'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    top: theme.spacing(10),
    zIndex: 200,
    // align in the middle
    left: '50%',
    transform: 'translate(-50%)',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function FloatingActionButtons(props) {
  const classes = useStyles()

  return (
    <Fab
      variant="extended"
      color="secondary"
      size="medium"
      className={classes.fab}
      onClick={props.onClick}
    >
      <RefreshIcon className={classes.extendedIcon} />
      Search here
    </Fab>
  )
}
