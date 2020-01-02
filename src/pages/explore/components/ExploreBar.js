import React from 'react'
import { withStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import MapIcon from '@material-ui/icons/Map'
import PropTypes from 'prop-types'
import ViewStreamIcon from '@material-ui/icons/ViewStream'

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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
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
      <div className={classes.grow}>
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
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
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
