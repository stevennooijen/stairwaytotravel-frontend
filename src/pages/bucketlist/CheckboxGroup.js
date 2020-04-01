import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'

class CheckboxesGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      flights: false,
      accomodation: false,
      localTransport: false,
      activities: false,
      none: false,
      error: true,
    }
  }

  handleChange = event => {
    this.setState(
      { ...this.state, [event.target.name]: event.target.checked },
      // use this setState callback to know for sure state is update before handling error
      () => {
        this.handleError()
      },
    )
  }

  handleError() {
    const {
      flights,
      accomodation,
      localTransport,
      activities,
      none,
    } = this.state
    const error =
      [flights, accomodation, localTransport, activities, none].filter(v => v)
        .length === 0
    this.setState({ error: error })
    // update props of higher order component
    if (error) {
      this.props.setCheckboxError(true)
    } else this.props.setCheckboxError(false)
  }

  render() {
    const {
      flights,
      accomodation,
      localTransport,
      activities,
      none,
      error,
    } = this.state

    return (
      <div>
        <FormControl required error={error} component="fieldset">
          <FormHelperText>Select at least one</FormHelperText>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={flights}
                  onChange={this.handleChange}
                  name="flights"
                />
              }
              label="Flights"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={accomodation}
                  onChange={this.handleChange}
                  name="accomodation"
                />
              }
              label="Accomodation"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={localTransport}
                  onChange={this.handleChange}
                  name="localTransport"
                />
              }
              label="Local transport"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={activities}
                  onChange={this.handleChange}
                  name="activities"
                />
              }
              label="Activities"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={none}
                  onChange={this.handleChange}
                  name="none"
                />
              }
              label="None, thanks."
            />
          </FormGroup>
        </FormControl>
      </div>
    )
  }
}

export default CheckboxesGroup
