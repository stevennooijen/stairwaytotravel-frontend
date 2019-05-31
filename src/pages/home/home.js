import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import SearchStepper from './SearchStepper'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

class Home extends React.Component {
  state = {
    // Check if previous search result still in sessionStorage, if not set as empty
    continent: sessionStorage.getItem('continent') || '',
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    sessionStorage.setItem([event.target.name], event.target.value)
  }

  render() {
    const { classes } = this.props

    return (
      // export default () => (
      <div>
        <header className="App-header">
          <h1 className="App-title">Welcome to stairway.travel</h1>
        </header>
        <p className="App-intro">
          To get started, choose which continent you want to go to and click{' '}
          <code>search!</code>.
        </p>
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
        <Button
          component={Link}
          to="/explore"
          variant="contained"
          color="primary"
        >
          Search!
        </Button>
        <br />
        <Button
          component={Link}
          to="/explore"
          variant="contained"
          color="primary"
          onClick={() => {
            sessionStorage.clear()
          }}
        >
          Search random!
        </Button>
        <SearchStepper />
      </div>
    )
  }
}

export default withStyles(styles)(Home)
