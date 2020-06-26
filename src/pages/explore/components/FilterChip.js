import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  filterChip: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
})

class FilterChip extends Component {
  render() {
    const { classes, ...props } = this.props

    return (
      <Chip
        label="Sort by"
        className={classes.filterChip}
        {...props}
        alt="Sort by buttton"
      />
    )
  }
}

export default withStyles(styles)(FilterChip)
