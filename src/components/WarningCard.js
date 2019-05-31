import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import RedirectButton from './RedirectButton'

class WarningCard extends Component {
  render() {
    return (
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="title" component="h2">
              Huh? No wishes?
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Looks like you haven't added any destinations to your bucketlist
              yet. Like your favorite destinations in the Explore tab to see
              them here.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <RedirectButton to_url="/" text="Search" />
          <RedirectButton to_url="/explore" text="Explore" />
        </CardActions>
      </Card>
    )
  }
}

export default WarningCard
