import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

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
  heroText: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(8),
      marginRight: theme.spacing(8),
    },
  },
  more: {
    margin: theme.spacing(2),
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

  componentDidMount() {
    window.scrollTo(0, 0)
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

  scrollToCall2Action = () => {
    this.call2actionRef.current.scrollIntoView({
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
        {/* Hero unit. Pass along scroller as action for buttons */}
        <HeroUnit>
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            className={classes.heroText}
          >
            Create your personalized travel itinerary
          </Typography>
          <Paper>
            {mapsApiLoaded && (
              <SearchBox
                map={mapsInstance}
                mapApi={mapsApi}
                placeQuery={placeQuery}
                searchInput={null}
                handlePlaceChange={place => {
                  savePlaceQuery(place)
                  this.props.history.push('/explore')
                }}
              />
            )}
          </Paper>
          <Typography variant="body2" color="inherit" className={classes.more}>
            OR...
          </Typography>
          <Button
            component={Link}
            to="/explore"
            variant="outlined"
            color="inherit"
            onClick={() => {
              sessionStorage.clear()
              savePlaceQuery('')
            }}
            size="large"
          >
            Search random!
          </Button>
        </HeroUnit>
        <Footer />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Home)
