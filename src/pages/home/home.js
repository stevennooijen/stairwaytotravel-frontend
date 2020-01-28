import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import SearchStepper from './stepper/SearchStepper'
import Footer from '../../components/Footer'
import HeroUnit from './HeroUnit'
import SearchBox from '../../components/SearchBox'
import GoogleMap from '../../components/mapview/components/GoogleMap'

const styles = theme => ({
  stepper: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundColor: theme.palette.background.paper,
  },
})

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.stepperRef = React.createRef()

    this.state = {
      mapsApiLoaded: false,
      mapsInstance: null,
      mapsApi: null,
    }
  }

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapsApiLoaded: true,
      mapsInstance: map,
      mapsApi: maps,
    })
  }

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
    const { mapsApiLoaded, mapsInstance, mapsApi } = this.state
    const { classes, placeQuery, savePlaceQuery } = this.props

    return (
      <React.Fragment>
        {/* // Here we create a mapInstance for the searchBox only */}
        <GoogleMap
          onGoogleApiLoaded={({ map, maps }) => {
            this.apiHasLoaded(map, maps)
          }}
        />
        {mapsApiLoaded && (
          <SearchBox
            map={mapsInstance}
            mapApi={mapsApi}
            placeName={placeQuery}
            handlePlaceChange={savePlaceQuery}
          />
        )}
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
