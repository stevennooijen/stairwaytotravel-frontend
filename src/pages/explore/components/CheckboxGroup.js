import React from 'react'

import FormGroup from '@material-ui/core/FormGroup'
// import FormControl from '@material-ui/core/FormControl'
// import FormHelperText from '@material-ui/core/FormHelperText'

class CheckboxesGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { children } = this.props

    return (
      <div>
        {/* <FormControl required error={checkboxError} component="fieldset"> */}
        {/* <FormHelperText>Select at least one</FormHelperText> */}
        <FormGroup row>{children}</FormGroup>
        {/* </FormControl> */}
      </div>
    )
  }
}

export default CheckboxesGroup
