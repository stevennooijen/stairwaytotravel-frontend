import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  ChipContainer: {
    paddingTop: theme.spacing(0.5),
    // paddingBottom: theme.spacing(0.5),
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
})

class ChipContainer extends Component {
  render() {
    const { classes, features, color, size } = this.props

    return (
      <div className={classes.ChipContainer}>
        {features &&
          // split description in multiple alineas
          features.map((feature, key) => {
            return <Chip label={feature} color={color} size={size} key={key} />
          })}
      </div>
    )
  }
}

export default withStyles(styles)(ChipContainer)
