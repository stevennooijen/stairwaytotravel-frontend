import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  gridItem: {
    padding: theme.spacing(1),
  },
})

class AlbumItem extends React.Component {
  render() {
    const { classes, key } = this.props

    return (
      <Grid item key={key} xs={12} sm={6} md={4} className={classes.gridItem}>
        {this.props.children}
      </Grid>
    )
  }
}

export default withStyles(styles)(AlbumItem)
