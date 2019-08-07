import React from 'react'

import Footer from '../../components/Footer'
// import HeroUnit from '../home/HeroUnit'

import ProductValues from './modules/Values'
import ProductHowItWorks from './modules/HowItWorks'
import AboutCompany from './modules/AboutCompany'
import Jumbotron from './modules/Jumbotron'
import DividerBlock from './modules/DividerBlock'
import ParralaxBlock from './modules/ParralaxBlock'
import CallToAction from './modules/CallToAction'

// Require() only takes static url variables, so a dynamic (!) imageFolder variable is not allowed
// https://stackoverflow.com/questions/44991669/react-native-require-with-dynamic-string
const backgroundImageList = [
  'beach-blur-boardwalk-132037.jpg',
  'city.jpg',
  'forest.jpg',
  'haiku-stairs.jpg',
  'mountain.jpg',
  // net iets minder mooi:
  // beautiful-boat-calm-398458.jpg,
].map(img => require('../../assets/stairways/wide/carousel/' + img))

class About extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      // Inspired from https://material-ui.com/premium-themes/onepirate/
      <React.Fragment>
        {/* // jumbotron image with text "Find your ideal holiday destination" */}
        {/* <ProductHero /> */}
        <Jumbotron />
        {/* // section: values: personalized. unique. unbiased. */}
        <ProductValues />
        {/* <DividerBlock /> */}
        <ParralaxBlock imageUrl={backgroundImageList[4]} imageAlt="someText" />
        {/* // section: how it works. 3 part explanation. NOT: pics of the app.. makes it hard */}
        <ProductHowItWorks />
        {/* <DividerBlock /> */}
        <ParralaxBlock imageUrl={backgroundImageList[2]} imageAlt="someText" />
        {/* // section: About. how we came up with the idea and who's behind it. Pic of myself. */}
        <AboutCompany />
        {/* // jumbotron with question to start exploring. */}
        <CallToAction />
        {/* <ProductSmokingHero /> */}
        <Footer />
      </React.Fragment>
    )
  }
}

export default About
