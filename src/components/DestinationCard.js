import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

const styles = theme => ({
  card: {
    height: '100%',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
})

class DestinationCard extends Component {
  // Constructor can only be called once to define state
  constructor(props) {
    super(props)

    // Define initial state
    this.state = {
      favorite: false,
    }
  }

  render() {
    // Properties and actions to do with DestinationCard are provided through props
    const { classes, card, toggleLike } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          title={card.name}
          // Change title font for this one component: https://material-ui.com/components/typography/#typography
          titleTypographyProps={{
            variant: 'h6',
            component: 'h2',
          }}
          action={
            <IconButton
              aria-label="Add to favorites"
              color="primary"
              // Set what needs to happen when Favorite is clicked
              // Function is provided through props from higher order component
              onClick={() => toggleLike(card.id)}
            >
              {/* Whether the item is already liked is also retrieved from higher order component through props */}
              {card.liked ? <FavoriteIcon /> : <FavoriteBorder />}
            </IconButton>
          }
        />
        <CardMedia
          className={classes.cardMedia}
          image={card.image}
          title={card.name}
        />
        <CardContent className={classes.cardContent}>
          <Typography color="textSecondary" variant="body1" component="p">
            {card.country_name}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

DestinationCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DestinationCard)
