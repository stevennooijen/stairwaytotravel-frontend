import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import StepButton from '@material-ui/core/StepButton'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import ContinentStep from './ContinentStep'
import BudgetStep from './BudgetStep'
import ActivityStep from './ActivityStep'
import RedirectButton from '../../../components/RedirectButton'

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(2),
  },
})

function getSteps() {
  return [
    'Which region do you like?',
    'What is your budget?',
    'What do you want to do?',
  ]
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ContinentStep />
    case 1:
      return <BudgetStep />
    case 2:
      return <ActivityStep />
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
    // return this.completedSteps() === totalSteps()
    return this.state.activeStep === totalSteps()
  }

  // anonymous function to preserve the context of the class
  handleSkip = () => {
    const newActiveStep =
      // this.isLastStep() && !this.allStepsCompleted()
      // ? // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      // steps.findIndex((step, i) => !(i in this.state.completed))
      // :
      this.state.activeStep + 1
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
    this.handleSkip()
  }

  // Note: handle reset also throws away selection thusfar.
  handleReset = () => {
    this.setState({ activeStep: 0 })
    this.setState({ completed: {} })
    sessionStorage.removeItem('budget')
    sessionStorage.removeItem('activityList')
    sessionStorage.removeItem('continent')
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
                {/* <Typography className={classes.instructions}> */}
                {getStepContent(index)}
                {/* </Typography> */}
                {/* box for buttons */}
                <div className={classes.actionsContainer}>
                  <Button
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  {/* don't show next button if in last step */}
                  {/* {this.state.activeStep < steps.length - 1 && ( */}
                  <Button
                    // variant="contained"
                    color="primary"
                    // onClick={this.handleSkip}
                    onClick={
                      this.handleSkip
                      // this.state.activeStep < steps.length - 1
                      //   ? this.handleSkip
                      //   : this.handleComplete
                    }
                    className={classes.button}
                  >
                    Skip
                  </Button>
                  {/* )} */}
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
                      // if not finished, show save or finish button
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleComplete}
                        className={classes.button}
                      >
                        {/* show save or finish */}
                        {/* {this.completedSteps() === totalSteps() - 1
                          ? 'Finish'
                          : 'Save'} */}
                        Save
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
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>
                  All steps completed - you&apos;re ready to explore!
                </Typography>
                <RedirectButton
                  to_url="/explore"
                  text="Explore"
                  variant="contained"
                />
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
