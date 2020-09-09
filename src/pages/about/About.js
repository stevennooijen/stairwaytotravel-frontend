import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import Footer from '../../components/Footer'
import ProductValues from './modules/Values'
import ProductHowItWorks from './modules/HowItWorks'
import DemoVideo from './modules/DemoVideo'
import AboutCompany from './modules/AboutCompany'
import Jumbotron from './modules/Jumbotron'
import ParralaxBlock from './modules/ParralaxBlock'
import CallToAction from './modules/CallToAction'

// Require() only takes static url variables, so a dynamic (!) imageFolder variable is not allowed
// https://stackoverflow.com/questions/44991669/react-native-require-with-dynamic-string
const backgroundImageList = ['forest.jpg', 'city.jpg', 'mountain.jpg'].map(
  img => require('../../assets/img/used/' + img),
)

const styles = theme => ({
  call2ActionRoot: {
    margin: 0,
    padding: 0,
  },
})

class About extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.stepperRef = React.createRef()
    this.call2actionRef = React.createRef()
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
      // Inspired from https://material-ui.com/premium-themes/onepirate/
      <React.Fragment>
        <Jumbotron scrollTo={this.scrollToStepper} />
        <Container ref={this.stepperRef} id="values">
          <ProductValues />
        </Container>
        <ParralaxBlock
          imageUrl={backgroundImageList[0]}
          imageAlt="A stairway in a forest pointing to the sky"
        >
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={this.scrollToCall2Action}
          >
            Sign me up
          </Button>
        </ParralaxBlock>
        <ProductHowItWorks />
        <DemoVideo />
        <ParralaxBlock
          imageUrl={backgroundImageList[1]}
          imageAlt="A stairway going down into a city neighbourhood at sunset hour"
        >
          <Button
            component={Link}
            to="/explore"
            variant="contained"
            color="secondary"
            onClick={() => {
              sessionStorage.clear()
            }}
            size="large"
          >
            Try it out
          </Button>
        </ParralaxBlock>
        <AboutCompany />
        <Container
          ref={this.call2actionRef}
          component="section"
          maxWidth={false}
          className={classes.call2ActionRoot}
          id="signup"
        >
          <CallToAction />
        </Container>
        <ParralaxBlock
          imageUrl={backgroundImageList[2]}
          imageAlt="A snowy stairway leading up a mountain"
        >
          <Button
            component={Link}
            to="/explore"
            variant="contained"
            color="secondary"
            onClick={() => {
              sessionStorage.clear()
            }}
            size="large"
          >
            Start exploring
          </Button>
        </ParralaxBlock>
        <Footer />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(About)
