import React, { Component } from 'react'
import ReactGA from 'react-ga'

import { withStyles, fade } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

const styles = theme => ({
  search: {
    position: 'relative',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.background.paper, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.background.paper, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    // [theme.breakpoints.up('md')]: {
    //   width: 250,
    // },
  },
  searchIcon: {
    width: theme.spacing(6),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.secondary.main,
  },
  inputRoot: {
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1.5, 1.5, 1.5, 5.5),
  },
})

class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.clearSearchBox = this.clearSearchBox.bind(this)
  }

  componentDidMount({ map, mapApi, placeQuery, searchInput } = this.props) {
    this.searchBox = new mapApi.places.Autocomplete(this.searchInput, {
      types: ['(regions)'],
    })
    // Prepopulate searchInput if there is a placeName or placeQuery already
    if (searchInput !== null) {
      this.searchInput.value = searchInput
    } else if (placeQuery !== '' && placeQuery !== undefined) {
      this.searchInput.value = placeQuery.formatted_address
    }
    // add listener for place changes
    this.searchBox.addListener('place_changed', this.onPlaceChanged)
    // Use bindTo() to bias the results to the map's viewport, even while that viewport changes.
    this.searchBox.bindTo('bounds', map)
  }

  // make sure to prepopulate searchInput when searchInput is set (e.g. 'selected map area')
  componentDidUpdate(prevProps) {
    if (
      (prevProps.searchInput === null) &
      (prevProps.searchInput !== this.props.searchInput)
    ) {
      this.searchInput.value = this.props.searchInput
    }
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput)
  }

  // whatever needs to happen is passed on from the higher component through handlePlaceChange
  onPlaceChanged = ({ handlePlaceChange } = this.props) => {
    const place = this.searchBox.getPlace()
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      // window.alert("No details available for input: '" + place.name + "'")
      return
    }
    handlePlaceChange(place)

    // send google analytics event
    ReactGA.event({
      category: 'Explore',
      action: 'Place search',
      value: 10,
    })
  }

  clearSearchBox() {
    this.searchInput.value = ''
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Explore a country/region"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputRef={ref => {
            this.searchInput = ref
          }}
          type="text"
          onFocus={this.clearSearchBox}
        />
      </div>
    )
  }
}

export default withStyles(styles)(SearchBox)
