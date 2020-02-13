import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    margin: '0 15px',
  },
})

class NothingFoundCard extends Component {
  render() {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            No destinations found.
          </Typography>
          <Typography color="textSecondary" variant="body1" component="p">
            Your search query is too specific. Try relaxing some of your
            criteria. For example, search in a bigger area.
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(NothingFoundCard)
