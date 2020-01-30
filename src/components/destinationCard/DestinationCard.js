import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Box from '@material-ui/core/Box'

// import PhotoCarousel from './Carousel'

const styles = theme => ({
  card: {
    height: '100%',
    // Make sure destinationPins don't show through the Card
    zIndex: 20,
    position: 'relative',
    // boxShadow: 'none',
  },
  cardMedia: {
    paddingTop: '80%', // 16:9 => '56.25%'
  },
  cardContent: {
    padding: theme.spacing(1),
    '&:last-child': {
      paddingBottom: theme.spacing(1.5),
    },
  },
  favoriteCircle: {
    position: 'absolute',
    top: 9,
    right: 8,
    backgroundColor: theme.palette.background.default,
    borderRadius: '50%',
    // opacity: 0.8,
  },
  favoriteButton: {
    padding: 4,
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
    const { classes, place, toggleLike, onClick } = this.props

    return (
      <Card
        className={classes.card}
        onClick={e => {
          e.stopPropagation()
          onClick()
        }}
      >
        <CardMedia
          className={classes.cardMedia}
          image={place.image}
          title={place.name}
        >
          <Box
            component="span"
            className={classes.favoriteCircle}
            boxShadow={3}
          >
            <IconButton
              className={classes.favoriteButton}
              aria-label="Add to favorites"
              color="primary"
              // Set what needs to happen when Favorite is clicked
              // Function is provided through props from higher order component
              onClick={e => {
                e.stopPropagation()
                toggleLike(place.id)
              }}
            >
              {place.liked ? <FavoriteIcon /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </CardMedia>
        {/* <PhotoCarousel /> */}
        <CardContent className={classes.cardContent}>
          <Typography color="textSecondary" variant="h6" component="h2">
            {place.name}
          </Typography>
          <Typography color="textSecondary" variant="body1" component="p">
            {place.country_name}
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
