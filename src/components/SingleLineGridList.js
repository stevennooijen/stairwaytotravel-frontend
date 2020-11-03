import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import DestinationCard from 'components/destinationCard/DestinationCard'

import ExampleList from 'assets/Constants'

const styles = theme => ({
  gridList: {
    overflowY: 'auto',
    listStyle: 'none',
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridItem: {
    padding: theme.spacing(1),
  },
})

class SingleLineGridList extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.gridList}>
        {/* Album passes along children components as provided through props */}
        {ExampleList.map(place => (
          <Grid item key={place.id} className={classes.gridItem}>
            <DestinationCard
              style={{ minWidth: 200 }}
              className={classes.tile}
              place={place}
              // toggleLike={id => this.toggleLike(id)}
              onClick={() => {
                // send to destination page
                this.props.history.push('/explore/' + place.id)
              }}
            />
          </Grid>
        ))}
      </Grid>
    )
  }
}

export default withStyles(styles)(SingleLineGridList)
