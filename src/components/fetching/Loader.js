import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'

const styles = theme => ({
  loaderContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
    display: 'flex',
    justifyContent: 'center',
  },
  favoriteCircle: {
    backgroundColor: theme.palette.background.default,
    borderRadius: '50%',
    zIndex: 200,
    padding: theme.spacing(1),
  },
})

class Loader extends Component {
  render() {
    const { classes, shadow } = this.props

    return (
      <Container className={classes.loaderContainer}>
        <Box
          component="span"
          className={classes.favoriteCircle}
          boxShadow={shadow}
        >
          <CircularProgress />
        </Box>
      </Container>
    )
  }
}

export default withStyles(styles)(Loader)
