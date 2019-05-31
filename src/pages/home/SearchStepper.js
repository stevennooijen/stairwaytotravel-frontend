import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 2,
  },
})

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad']
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: Select campaign settings...'
    case 1:
      return 'Step 2: What is an ad group anyways?'
    case 2:
      return 'Step 3: This is the bit I really care about!'
    default:
      return 'Unknown step'
  }
}

const steps = getSteps()

function totalSteps() {
  return steps.length
}

class SearchStepper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeStep: 0,
      completed: {},
    }
  }

  completedSteps() {
    return Object.keys(this.state.completed).length
  }

  isLastStep() {
    return this.state.activeStep === totalSteps() - 1
  }

  allStepsCompleted() {
    return this.completedSteps() === totalSteps()
  }

  // anonymous function to preserve the context of the class
  handleNext = () => {
    const newActiveStep =
      this.isLastStep() && !this.allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in this.state.completed))
        : this.state.activeStep + 1
    this.setState({ activeStep: newActiveStep })
  }

  // anonymous function to preserve the context of the class
  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 })
  }

  handleStep = step => () => {
    this.setState({ activeStep: step })
  }

  handleComplete = () => {
    const newCompleted = this.state.completed
    newCompleted[this.state.activeStep] = true
    this.setState({ completed: newCompleted })
    this.handleNext()
  }

  handleReset = () => {
    this.setState({ activeStep: 0 })
    this.setState({ completed: {} })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        {/* Define the Stepper */}
        <Stepper
          nonLinear
          activeStep={this.state.activeStep}
          orientation="vertical"
        >
          {/* For each step in Stepper do: */}
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                onClick={this.handleStep(index)}
                completed={this.state.completed[index]}
              >
                {label}
              </StepButton>
              <StepContent>
                {/* content of step is retrieved */}
                <Typography className={classes.instructions}>
                  {getStepContent(index)}
                </Typography>
                {/* box for buttons */}
                <div className={classes.actionsContainer}>
                  <Button
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
                  {/* if finished show text */}
                  {this.state.activeStep !== steps.length &&
                    (this.state.completed[this.state.activeStep] ? (
                      <Typography
                        variant="caption"
                        className={classes.completed}
                      >
                        Step {this.state.activeStep + 1} already completed
                      </Typography>
                    ) : (
                      // if not finished, allow to complete
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleComplete}
                      >
                        {this.completedSteps() === totalSteps() - 1
                          ? 'Finish'
                          : 'Complete Step'}
                      </Button>
                    ))}
                </div>
              </StepContent>
            </Step>
          ))}
          {/* End of Stepper */}
        </Stepper>
        {/* Reset or proceed to Explore when all steps complete */}
        <div>
          {this.allStepsCompleted() ? (
            <div>
              {/* <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button> */}
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </Paper>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SearchStepper)
