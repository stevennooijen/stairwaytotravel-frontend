import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import RedirectButton from './RedirectButton'

class WarningCard extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            Huh? No wishes?
          </Typography>
          <Typography color="textSecondary" variant="body1" component="p">
            Looks like you haven't added any destinations to your bucketlist
            yet. Like your favorite destinations in the Explore tab to see them
            here.
          </Typography>
        </CardContent>
        <CardActions>
          <RedirectButton to_url="/" text="Search" />
          <RedirectButton to_url="/explore" text="Explore" />
        </CardActions>
      </Card>
    )
  }
}

export default WarningCard
