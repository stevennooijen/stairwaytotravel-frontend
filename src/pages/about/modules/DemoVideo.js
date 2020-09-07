import React from 'react'
import ReactPlayer from 'react-player'

import { Waypoint } from 'react-waypoint'

import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const styles = theme => ({
  root: {
    // marginTop: 0,
    // marginBottom: 0,
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
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
          <div>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=9jicy7h0cnA"
              playing={this.state.playing}
            />
          </div>
        </Waypoint>
      </Container>
    )
  }
}

export default withStyles(styles)(DemoVideo)
