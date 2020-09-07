import React from 'react'
import ReactPlayer from 'react-player'

import { Waypoint } from 'react-waypoint'

import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,

    width: '100%',
    maxWidth: 1200,
  },
  videoContainer: {
    position: 'relative',
    paddingTop: '56.25%', // Percentage ratio for 16:9
  },
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
})

class DemoVideo extends React.Component {
  state = {
    playing: false,
  }

  handlePlayingState = () => {
    console.log('fire', this.state.playing)
    this.setState({
      playing: !this.state.playing,
    })
  }

  render() {
    const { classes } = this.props

    return (
      <Container className={classes.root} component="section" maxWidth={false}>
        <Waypoint
          onEnter={this.handlePlayingState}
          onLeave={this.handlePlayingState}
        >
          <Card className={classes.card}>
            <CardContent className={classes.cardContent} align="center">
              <Typography variant="h3">Demo video</Typography>
            </CardContent>
            <div className={classes.videoContainer}>
              <ReactPlayer
                className={classes.reactPlayer}
                url="https://www.youtube.com/watch?v=9jicy7h0cnA"
                playing={this.state.playing}
                width="100%"
                height="100%"
              />
            </div>
          </Card>
        </Waypoint>
      </Container>
    )
  }
}

export default withStyles(styles)(DemoVideo)
