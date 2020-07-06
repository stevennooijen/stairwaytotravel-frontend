import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  maxPlacesText: {
    margin: theme.spacing(2),
  },
})

class ResultsBar extends Component {
  render() {
    const { classes, text, children } = this.props

    return (
      <Container maxWidth="lg">
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          className={classes.maxPlacesText}
        >
          {text}
        </Typography>
        {children}
        <Divider variant="middle" />
      </Container>
    )
  }
}

export default withStyles(styles)(ResultsBar)
