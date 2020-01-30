import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MapIcon from '@material-ui/icons/Map'
import PropTypes from 'prop-types'
import ViewStreamIcon from '@material-ui/icons/ViewStream'
import Container from '@material-ui/core/Container'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  show: {
    transform: 'translateY(0)',
    transition: 'transform .5s',
  },
  hide: {
    transform: 'translateY(-110%)',
    transition: 'transform .5s',
  },
  sectionDesktop: {
    display: 'flex',
  },
})

class ExploreBar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      shouldShow: null,
    }

    this.lastScroll = null

    this.handleScroll = this.handleScroll.bind(this)
    // Alternatively, you can throttle scroll events to avoid
    // updating the state too often. Here using lodash.
    // this.handleScroll = _.throttle(this.handleScroll.bind(this), 100);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(evt) {
    const lastScroll = window.scrollY

    if (lastScroll === this.lastScroll) {
      return
    }

    const shouldShow =
      this.lastScroll !== null ? lastScroll < this.lastScroll : null

    if (shouldShow !== this.state.shouldShow) {
      this.setState((prevState, props) => ({
        ...prevState,
        shouldShow,
      }))
    }

    this.lastScroll = lastScroll
  }

  render() {
    const { classes, showMap, toggleShowMap } = this.props
    // const menuId = 'primary-search-account-menu'

    return (
      // {/* Could split AppBar and Toolbar in separate components */}
      // {/* AppBar would then just facilitate for the scroll logic */}
      <div>
        <AppBar
          position="fixed"
          //   color="default"
          className={`${classes.root} ${
            this.state.shouldShow === null
              ? ''
              : this.state.shouldShow
                ? classes.show
                : classes.hide
          }`}
        >
          <Container maxWidth="lg">
            <Toolbar>
              {/* SearchBox will be passed on here */}
              {this.props.children}
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  // aria-controls={menuId}
                  aria-haspopup="true"
                  //   TODO: add action for mapview
                  onClick={toggleShowMap}
                  color="inherit"
                >
                  {showMap ? <ViewStreamIcon /> : <MapIcon />}
                </IconButton>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
        {/* Render 2nd toolbar to make sure content doesn't disappear behind the first */}
        <Toolbar />
      </div>
    )
  }
}

ExploreBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ExploreBar)
