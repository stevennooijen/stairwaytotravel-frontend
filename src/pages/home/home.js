import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'

import ProductValues from '../about/modules/Values'
import ProductHowItWorks from '../about/modules/HowItWorks'
import AboutCompany from '../about/modules/AboutCompany'
import ParralaxBlock from '../about/modules/ParralaxBlock'
import CallToAction from '../about/modules/CallToAction'
import Footer from '../../components/Footer'
import HeroUnit from './HeroUnit'

// Require() only takes static url variables, so a dynamic (!) imageFolder variable is not allowed
// https://stackoverflow.com/questions/44991669/react-native-require-with-dynamic-string
const backgroundImageList = ['forest.jpg', 'city.jpg', 'mountain.jpg'].map(
  img => require('../../assets/img/used/' + img),
)

const styles = theme => ({
  stepper: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundColor: theme.palette.background.paper,
  },
  call2ActionRoot: {
    margin: 0,
    padding: 0,
  },
})

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.stepperRef = React.createRef()
    this.call2actionRef = React.createRef()
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

  scrollToCall2Action = () => {
    this.call2actionRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        {/* Hero unit. Pass along scroller as action for buttons */}
        <HeroUnit scrollTo={this.scrollToStepper} />
        <Container ref={this.stepperRef}>
          <ProductValues />
        </Container>

        <ParralaxBlock
          imageUrl={backgroundImageList[0]}
          imageAlt="A stairway in a forest pointing to the sky"
          scrollTo={this.scrollToCall2Action}
          buttonText="Stay in touch"
        />
        <ProductHowItWorks />
        <ParralaxBlock
          imageUrl={backgroundImageList[1]}
          imageAlt="A stairway going down into a city neighbourhood at sunset hour"
          scrollTo={this.scrollToCall2Action}
          buttonText="Keep me updated"
        />
        <AboutCompany />
        <Container
          ref={this.call2actionRef}
          component="section"
          maxWidth={false}
          className={classes.call2ActionRoot}
        >
          <CallToAction />
        </Container>
        <ParralaxBlock
          imageUrl={backgroundImageList[2]}
          imageAlt="A snowy stairway leading up a mountain"
          scrollTo={this.scrollToCall2Action}
          buttonText="Sign me up"
        />
        {/* Footer */}
        <Footer />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Home)
