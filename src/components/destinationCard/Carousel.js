import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
  },
  imageContainer: {
    height: 0,
    paddingTop: '75%', // 4:3
    overflow: 'hidden',
    position: 'relative',
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
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
  dotActive: {
    backgroundColor: theme.palette.secondary.main,
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
        // Make sure to 'freeze' the map upon swiping the carousel for mobile (touch) and web (mouse)
        onTouchStart={event => {
          props.mapGestureHandling && props.mapGestureHandling('none')
        }}
        onTouchEnd={event => {
          props.mapGestureHandling && props.mapGestureHandling('greedy')
        }}
        onMouseDown={event => {
          props.mapGestureHandling && props.mapGestureHandling('none')
        }}
        onMouseUp={event => {
          props.mapGestureHandling && props.mapGestureHandling('greedy')
        }}
      >
        {props.imageList.map((step, index) => (
          <div
            key={step.label + step.imgPath}
            className={classes.imageContainer}
          >
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={step.imgPath}
                alt={step.label}
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
        classes={{ dotActive: classes.dotActive }}
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
