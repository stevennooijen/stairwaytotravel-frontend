import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

// import ReactDOM from 'react-dom'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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
    continent: '',
    // labelWidth: 0,
  }

  // componentDidMount() {
  //   this.setState({
  //     labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
  //   })
  // }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
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
            onChange={this.handleChange('continent')}
            inputProps={{
              name: 'continent',
              id: 'continent-native-simple',
            }}
          >
            <option value="" />
            <option value={10}>Europe</option>
            <option value={20}>Asia</option>
            <option value={30}>Africa</option>
            <option value={40}>North-America</option>
            <option value={50}>South-America</option>
            <option value={60}>Oceania</option>
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
      </div>
    )
  }
}

export default withStyles(styles)(Home)
