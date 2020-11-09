import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  gridList: {
    overflowY: 'auto',
    listStyle: 'none',
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
})

class SingleLineGridList extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.gridList}>
        {this.props.children}
      </Grid>
    )
  }
}

export default withStyles(styles)(SingleLineGridList)
