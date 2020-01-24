import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import SearchStepper from './stepper/SearchStepper'
import Container from '@material-ui/core/Container'

import Footer from '../../components/Footer'
import HeroUnit from './HeroUnit'
// import SimpleSelect from '../../components/SearchBox2'
import SearchBox from '../../components/SearchBox'
import LocationSearchInput from '../../components/PlacesAutocomplete'

// import GoogleMapReact from 'google-map-react'
// const { googleMapLoader } = GoogleMapReact
// import { bootstrapURLKeys } from './bootstrapURLKeys';
// import GoogleMapReact from 'google-map-react'

const styles = theme => ({
  stepper: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundColor: theme.palette.background.paper,
  },
})

// const bootstrapURLKeys = {
//   key: process.env.REACT_APP_MAP_KEY,
//   libraries: ['places', 'geometry'],
// }
// const bootstrapURLKeys = {
//   // ...yourKeys,
//   key: process.env.REACT_APP_MAP_KEY,
//   libraries: ['places'].join(','),
// }

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.stepperRef = React.createRef()
  }

  // state = {
  // Check if previous search result still in sessionStorage, if not set as empty
  // continent: sessionStorage.getItem('continent') || '',
  // }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    sessionStorage.setItem([event.target.name], event.target.value)
  }

  // scrolling function
  scrollToStepper = () => {
    this.stepperRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  render() {
    const {
      classes,
      placeQuery,
      savePlaceQuery,
      mapApiLoaded,
      mapInstance,
      mapApi,
    } = this.props
    // const { places, mapApiLoaded, mapInstance, mapApi } = this.state

    return (
      <React.Fragment>
        <LocationSearchInput />
        {/* {mapApiLoaded && (
          // <p>test</p>
          <SearchBox
            map={mapInstance}
            mapApi={mapApi}
            addplace={savePlaceQuery}
            placename={placeQuery}
          />
        )} */}
        {/* Hero unit. Pass along scroller as action for buttons */}
        <HeroUnit scrollTo={this.scrollToStepper} />
        {/* Stepper section, with reference for scrolling to */}
        <Container
          className={classes.stepper}
          maxWidth="md"
          ref={this.stepperRef}
        >
          <SearchStepper />
        </Container>
        {/* Footer */}
        <Footer />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Home)
