import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// import CardHeader from '@material-ui/core/CardHeader'

// TODO: How does this work?
// import { minWidth } from '@material-ui/core'
// import { sizing } from '@material-ui/core'

const styles = theme => ({
  card: {
    height: '100%',
    // TODO: How does this work?
    // minWidth: '400',
    // width: '100%',
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

class DestinationCard extends Component {
  // Constructor can only be called once to define state
  constructor(props) {
    super(props)

    // Define initial state
    this.state = {
      favorite: false,
    }
  }

  // Function to do something when Favorite is clicked
  handleFavorite() {
    this.setState(old => ({
      favorite: old.favorite ? false : true,
    }))
  }

  render() {
    const { classes } = this.props
    const { favorite } = this.state

    return (
      <Card className={classes.card}>
        {/* <CardHeader
          action={
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          // TODO: How to change font?
          titleTypographyProps={{ variant: 'h2' }}
        /> */}
        <CardActions>
          <IconButton
            aria-label="Add to favorites"
            color="primary"
            // Set what needs to happen when Favorite is clicked
            onClick={() => this.handleFavorite()}
            // onClick={() => {
            //   sessionStorage.setItem('liked', '1')
            // }}
          >
            {favorite ? <FavoriteIcon /> : <FavoriteBorder />}
          </IconButton>
        </CardActions>
        <CardMedia
          className={classes.cardMedia}
          image={this.props.image}
          title={this.props.title}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="title" component="h2">
            {this.props.title}
          </Typography>
          {/* // TODO: why does entire sizing change if this is removed? how to set to minwidth? */}
          <Typography>
            This is a media card. You can use this section to describe the
            content.
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
