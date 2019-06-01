import React from 'react'
import { withStyles } from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
// import FormLabel from '@material-ui/core/FormLabel'

// import Slider from '@material-ui/lab/Slider'

const styles = theme => ({
  // slider: {
  //   padding: '22px 0px',
  // },
  // root: {
  //   display: 'flex',
  // },
  formControl: {
    margin: theme.spacing.unit,
  },
  group: {
    margin: theme.spacing.unit,
  },
})

class BudgetStep extends React.Component {
  constructor(props) {
    super(props)

    // Define initial state
    this.state = {
      // Check if previous search result still in sessionStorage, if not set as empty
      //   value: sessionStorage.getItem('continent') || '',
      budget: sessionStorage.getItem('budget') || 'average',
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    sessionStorage.setItem([event.target.name], event.target.value)
  }

  render() {
    const { classes } = this.props

    return (
      // <React.Fragment>
      <div className={classes.root}>
        {/* <Typography>Step 2: Select your budget...</Typography> */}
        {/* Radio buttons for now as Slider not working yet */}
        <FormControl component="fieldset" className={classes.formControl}>
          {/* <FormLabel component="legend">Budget</FormLabel> */}
          <RadioGroup
            aria-label="Budget"
            name="budget"
            className={classes.group}
            value={this.state.budget}
            onChange={this.handleChange}
          >
            <FormControlLabel value="cheap" control={<Radio />} label="Cheap" />
            <FormControlLabel
              value="average"
              control={<Radio />}
              label="Average"
            />
            <FormControlLabel
              value="luxury"
              control={<Radio />}
              label="Luxury"
            />
          </RadioGroup>
        </FormControl>

        {/* // Code for Slider */}
        {/* <div className={classes.root}>
          <Typography id="label">Slider label</Typography>
          <Slider
            className={classes.slider}
            value={this.state.budget}
            aria-labelledby="label"
            onChange={this.handleChange}
          />
        </div> */}
      </div>
      // {/* </React.Fragment> */}
    )
  }
}

// TODO: vraag leon wat dit eigenlijk doet?
// BudgetStep.propTypes = {
//   classes: BudgetStep.object.isRequired,
// }

export default withStyles(styles)(BudgetStep)
