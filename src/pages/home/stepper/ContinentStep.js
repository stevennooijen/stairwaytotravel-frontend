import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
// import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
})

class ContinentStep extends React.Component {
  constructor(props) {
    super(props)

    // Define initial state
    this.state = {
      // Check if previous search result still in sessionStorage, if not set as empty
      continent: sessionStorage.getItem('continent') || '',
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    sessionStorage.setItem([event.target.name], event.target.value)
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        {/* <Typography>What continent do you want to go to?</Typography> */}
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="continent-native-simple">Continent</InputLabel>
          <Select
            native
            value={this.state.continent}
            onChange={this.handleChange}
            inputProps={{
              name: 'continent',
              id: 'continent-native-simple',
            }}
          >
            <option value="" />
            <option value="EU">Europe</option>
            <option value="AS">Asia</option>
            <option value="AF">Africa</option>
            <option value="NA">North-America</option>
            <option value="SA">South-America</option>
            <option value="OC">Oceania</option>
          </Select>
        </FormControl>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ContinentStep)
