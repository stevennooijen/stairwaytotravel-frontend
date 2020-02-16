import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

// TODO: also pass along alt text of the image. Input array needs to be of form:
// const tutorialSteps = [
//   {
//     label: 'San Francisco – Oakland Bay Bridge, United States',
//     imgPath:
//       'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
//   },
//   {
//     label: 'Bird',
//     imgPath:
//       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
//   },
// ]

const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    // maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
  favoriteCircle: {
    position: 'absolute',
    top: 9,
    right: 8,
    backgroundColor: theme.palette.background.default,
    borderRadius: '50%',
    // opacity: 0.8,
  },
  favoriteButton: {
    padding: 4,
  },
}))

export default function TextMobileStepper(props) {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = props.imageList.length

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  function handleStepChange(step) {
    setActiveStep(step)
  }

  return (
    <div className={classes.root}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {props.imageList.map((step, index) => (
          // TODO: use alt text label for defining a unique key
          // <div key={step.label}>
          <div key={step}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={step}
                alt="Something matching the destination"
                // TODO: set proper alt text
                // src={step.imgPath}
                // alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      {props.children}
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        className={classes.root}
        nextButton={
          <Button
            size="small"
            onClick={e => {
              e.stopPropagation()
              handleNext()
            }}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={e => {
              e.stopPropagation()
              handleBack()
            }}
            disabled={activeStep === 0}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  )
}
