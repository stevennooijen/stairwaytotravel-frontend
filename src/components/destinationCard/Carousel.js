import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600, // 600 = 'sm', 960 = 'md' size
  },
  imageContainer: {
    width: '100%',
    paddingBottom: '75%', // 4:3
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
    // for centering standing images
    display: 'flex',
    justifyContent: 'center',
  },
  img: {
    position: 'absolute',
    height: '100%',
    top: 0,
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

  const activeImage = props.imageList[activeStep]

  return (
    <div className={classes.root}>
      {props.showCarousel ? (
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
      ) : (
        <div
          key={props.imageList[0].label + props.imageList[0].imgPath}
          className={classes.imageContainer}
        >
          <img
            className={classes.img}
            src={props.imageList[0].imgPath}
            alt={props.imageList[0].label}
          />
        </div>
      )}
      {props.children}
      {props.showAttribution &&
        // in case of no owner, don't display caption
        activeImage.owner && (
          <Typography variant="caption">
            <i>
              {activeImage.label && '"' + activeImage.label + '" - '}
              Photo by{' '}
              <Link
                href={activeImage.attributionLink}
                target="_blank"
                rel="noopener"
                color="secondary"
              >
                {activeImage.owner}
              </Link>
            </i>
          </Typography>
        )}
      {props.showCarousel && (
        <MobileStepper
          variant="text"
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
      )}
    </div>
  )
}
