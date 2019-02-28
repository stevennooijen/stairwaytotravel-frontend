import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
})

// Destination class has no state, but gets destination data in through props
class Destination extends Component {
  render() {
    const { classes, destinationName } = this.props

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={require('../../assets/beach.jpg')}
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {destinationName}
            </Typography>
            <Typography>
              This is a media card. You can use this section to describe the
              content.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Dislike
            </Button>
            <Button size="small" color="primary" variant="contained">
              Like
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

Destination.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Destination)
