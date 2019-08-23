import React from 'react'

import Footer from '../../components/Footer'
// import HeroUnit from '../home/HeroUnit'

import ProductValues from './modules/Values'
import ProductHowItWorks from './modules/HowItWorks'
import AboutCompany from './modules/AboutCompany'
import Jumbotron from './modules/Jumbotron'
// import DividerBlock from './modules/DividerBlock'
import ParralaxBlock from './modules/ParralaxBlock'
import CallToAction from './modules/CallToAction'

// Require() only takes static url variables, so a dynamic (!) imageFolder variable is not allowed
// https://stackoverflow.com/questions/44991669/react-native-require-with-dynamic-string
const backgroundImageList = ['forest.jpg', 'city.jpg', 'mountain.jpg'].map(
  img => require('../../assets/img/used/' + img),
)

class About extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      // Inspired from https://material-ui.com/premium-themes/onepirate/
      <React.Fragment>
        <Jumbotron />
        <ProductValues />
        <ParralaxBlock
          imageUrl={backgroundImageList[0]}
          imageAlt="A stairway in a forest pointing to the sky"
        />
        <ProductHowItWorks />
        <ParralaxBlock
          imageUrl={backgroundImageList[1]}
          imageAlt="A stairway going down into a city neighbourhood at sunset hour"
        />
        <AboutCompany />
        <CallToAction />
        <ParralaxBlock
          imageUrl={backgroundImageList[2]}
          imageAlt="A snowy stairway leading up a mountain"
        />
        <Footer />
      </React.Fragment>
    )
  }
}

export default About
