import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import RedirectButton from '../../components/RedirectButton'

const styles = theme => ({
  card: {
    maxWidth: 400,
    // apply margin left and right
    margin: `0 ${theme.spacing(3)}px`,
  },
})

class WarningCard extends Component {
  render() {
    const { classes } = this.props

    return (
      <Card className={classes.card} align="center">
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            No likes?
          </Typography>
          <Typography color="textSecondary" variant="body1" component="p">
            Looks like you haven't added any places to your bucket list yet.
            Like your favorite places in the Explore tab to see them here.
          </Typography>
        </CardContent>
        <CardActions>
          <RedirectButton
            to_url="/explore"
            text="Explore"
            variant="contained"
          />
          <RedirectButton to_url="/" text="Home" />
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(WarningCard)
