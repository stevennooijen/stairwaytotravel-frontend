import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'

class CheckboxesGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const {
      flights,
      accomodation,
      localTransport,
      activities,
      none,
      handleCheckboxChange,
      checkboxError,
    } = this.props

    return (
      <div>
        <FormControl required error={checkboxError} component="fieldset">
          <FormHelperText>Select at least one</FormHelperText>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={flights}
                  onChange={handleCheckboxChange}
                  name="flights"
                />
              }
              label="Flights"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={accomodation}
                  onChange={handleCheckboxChange}
                  name="accomodation"
                />
              }
              label="Accomodation"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={localTransport}
                  onChange={handleCheckboxChange}
                  name="localTransport"
                />
              }
              label="Local transport"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={activities}
                  onChange={handleCheckboxChange}
                  name="activities"
                />
              }
              label="Activities"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={none}
                  onChange={handleCheckboxChange}
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
