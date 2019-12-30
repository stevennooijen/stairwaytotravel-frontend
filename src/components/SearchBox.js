import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '20px',
  },
})

class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.clearSearchBox = this.clearSearchBox.bind(this)
  }

  componentDidMount({ map, mapApi } = this.props) {
    this.searchBox = new mapApi.places.SearchBox(this.searchInput)
    this.searchBox.addListener('places_changed', this.onPlacesChanged)
    this.searchBox.bindTo('bounds', map)
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput)
  }

  onPlacesChanged = ({ map, addplace } = this.props) => {
    const selected = this.searchBox.getPlaces()
    const { 0: place } = selected
    if (!place.geometry) return
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport)
    } else {
      map.setCenter(place.geometry.location)
      map.setZoom(17)
    }

    addplace(selected)
    this.searchInput.blur()
  }

  clearSearchBox() {
    this.searchInput.value = ''
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.wrapper}>
        <TextField
          id="standard-basic"
          label="Where"
          // <input
          inputRef={ref => {
            this.searchInput = ref
          }}
          type="text"
          onFocus={this.clearSearchBox}
          placeholder="Enter a location"
        />
      </div>
    )
  }
}

export default withStyles(styles)(SearchBox)
