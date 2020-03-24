import React, { Component } from 'react'
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

  componentDidMount({ map, mapApi, placeName } = this.props) {
    this.searchBox = new mapApi.places.Autocomplete(this.searchInput, {
      types: ['(regions)'],
    })
    // Prepopulate search field if there is a placename already
    if (placeName !== '' && placeName !== undefined) {
      this.searchInput.value = placeName.formatted_address
    }
    // add listener for place changes
    this.searchBox.addListener('place_changed', this.onPlaceChanged)
    // Use bindTo() to bias the results to the map's viewport, even while that viewport changes.
    this.searchBox.bindTo('bounds', map)
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput)
  }

  // whatever needs to happen is passed on from the higher component through handlePlaceChange
  onPlaceChanged = ({ handlePlaceChange } = this.props) => {
    const place = this.searchBox.getPlace()
    handlePlaceChange(place)
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
          placeholder="Try &quot;Netherlands&quot;"
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
