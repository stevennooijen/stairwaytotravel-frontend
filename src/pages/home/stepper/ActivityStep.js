import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Select from 'react-select'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import MenuItem from '@material-ui/core/MenuItem'
import CancelIcon from '@material-ui/icons/Cancel'
import { emphasize } from '@material-ui/core/styles/colorManipulator'
import PropTypes from 'prop-types'

// list from 'destination_search_types.csv`
const suggestions = [
  { label: 'Off-road vehicles', value: 'offroad_vehicles' },
  { label: 'Amusement/theme parks', value: 'amusement_theme_parks' },
  { label: 'Ancient ruins', value: 'ancient_ruins' },
  { label: 'Architectural buildings', value: 'architectural_buildings' },
  { label: 'Art galleries', value: 'art_galleries' },
  { label: 'Museums', value: 'museums' },
  { label: 'Battlefields', value: 'battlefields' },
  { label: 'Bays', value: 'bays' },
  { label: 'Beaches', value: 'beaches' },
  { label: 'Biking', value: 'biking' },
  { label: 'Jazz/blues bars', value: 'jazz_blues_bars' },
  { label: 'Breweries', value: 'breweries' },
  { label: 'Bridges', value: 'bridges' },
  { label: 'Canyons', value: 'canyons' },
  { label: 'Casinos', value: 'casinos' },
  { label: 'Castles', value: 'castles' },
  { label: 'Cemeteries', value: 'cemeteries' },
  { label: 'Coffeehouses', value: 'coffeehouses' },
  { label: 'Comedy clubs', value: 'comedy_clubs' },
  { label: 'Bars', value: 'bars' },
  { label: 'Dance clubs/discos', value: 'dance_clubs_discos' },
  { label: 'Department stores', value: 'department_stores' },
  { label: 'Deserts', value: 'deserts' },
  { label: 'Theaters', value: 'theaters' },
  { label: 'Hiking', value: 'hiking' },
  { label: 'Factory outlets', value: 'factory_outlets' },
  { label: 'Farms', value: 'farms' },
  { label: 'Flea/street markets', value: 'flea_street_markets' },
  { label: 'Forests', value: 'forests' },
  { label: 'Gardens', value: 'gardens' },
  { label: 'Golf courses', value: 'golf_courses' },
  { label: 'Boat tours', value: 'boat_tours' },
  { label: 'Monuments', value: 'monuments' },
  { label: 'Historic villages', value: 'historic_villages' },
  { label: 'Horseback riding', value: 'horseback_riding' },
  { label: 'Hot springs/geysers', value: 'hot_springs_geysers' },
  { label: 'Islands', value: 'islands' },
  { label: 'Lakes', value: 'lakes' },
  { label: 'Landmarks', value: 'landmarks' },
  { label: 'Viewpoints', value: 'viewpoints' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Marina', value: 'marina' },
  { label: 'Motorcycle trails', value: 'motorcycle_trails' },
  { label: 'Mountain biking', value: 'mountain_biking' },
  { label: 'Mountains', value: 'mountains' },
  { label: 'Movie theaters', value: 'movie_theaters' },
  { label: 'Caves', value: 'caves' },
  { label: 'National parks', value: 'national_parks' },
  { label: 'Wildlife reserves', value: 'wildlife_reserves' },
  { label: 'Operas / Ballets', value: 'operas_ballets' },
  { label: 'Concerts', value: 'concerts' },
  { label: 'Lagoons', value: 'lagoons' },
  { label: 'Rivers', value: 'rivers' },
  { label: 'Scenic drives', value: 'scenic_drives' },
  { label: 'Neighborhood walks', value: 'neighborhood_walks' },
  { label: 'Ski Snowboard areas', value: 'ski_snowboard_areas' },
  { label: 'Spas', value: 'spas' },
  { label: 'Sport events', value: 'sport_events' },
  { label: 'University', value: 'university' },
  { label: 'Statues', value: 'statues' },
  { label: 'Sightseeing tours', value: 'sightseeing_tours' },
  {
    label: 'Town centers/squares/plazas',
    value: 'town_centers_squares_plazas',
  },
  { label: 'Urban parks', value: 'urban_parks' },
  { label: 'Valleys', value: 'valleys' },
  { label: 'Volcanos', value: 'volcanos' },
  { label: 'Water parks', value: 'water_parks' },
  { label: 'Waterfalls', value: 'waterfalls' },
  { label: 'Wineries', value: 'wineries' },
  { label: 'Zoos', value: 'zoos' },
  { label: 'Surfing', value: 'surfing' },
  { label: 'Water sports', value: 'water_sports' },
  { label: 'Kayaking', value: 'kayaking' },
  { label: 'Rafting', value: 'rafting' },
  { label: 'Scuba Diving', value: 'scuba_diving' },
  { label: 'Waterskiing', value: 'waterskiing' },
  { label: 'Historical tours', value: 'historical_tours' },
  { label: 'Fishing', value: 'fishing' },
  { label: 'Whale watching', value: 'whale_watching' },
  { label: 'Parasailing', value: 'sailing' },
  { label: 'Paragliding', value: 'skydiving' },
  { label: 'Cathedrals and churches', value: 'cathedrals_and_churches' },
  { label: 'Live music / bands', value: 'live_music_bands' },
  { label: 'Festivals', value: 'festivals' },
  { label: 'Camping', value: 'camping' },
  { label: 'Lodging', value: 'lodging' },
  { label: 'UNESCO', value: 'unesco' },
  { label: 'Temples', value: 'temples' },
]

const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: 250,
    margin: theme.spacing.unit,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    // margin: theme.spacing(0.5, 0.25),
    marginTop: theme.spacing.unit * 0.5,
    marginBottom: theme.spacing.unit * 0.5,
    marginLeft: theme.spacing.unit * 0.25,
    marginRight: theme.spacing.unit * 0.25,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    // padding: theme.spacing(1, 2),
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
})

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.TextFieldProps}
    />
  )
}

Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectProps: PropTypes.object.isRequired,
}

function Option(props) {
  return (
    <MenuItem
      // ref makes it crash!!
      //   ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

SingleValue.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  )
}

ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired,
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  )
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool,
  removeProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  )
}

Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object,
}

// Customise components: https://react-select.com/components
const components = {
  // Styles search box
  Control,
  // TODO: menu doesn't seem to work
  Menu,
  // Styles chosen values into nice chips
  MultiValue,
  // Styles no options message
  NoOptionsMessage,
  // CRASHES!!
  Option,
  // Styles placeholder text
  Placeholder,
  // Styles selection
  SingleValue,
  // Styles container holding the placeholder and inputs
  ValueContainer,
}

const customStyles = {
  input: base => ({
    ...base,
    // color: theme.palette.text.primary,
    color: 'primary',
    '& input': {
      font: 'inherit',
    },
  }),
}

class ActivityStep extends React.Component {
  constructor(props) {
    super(props)

    // Define initial state
    this.state = {
      // Check if previous search result still in sessionStorage, if not set as empty
      activityList: [],
    }
  }

  //   componentDidMount() {
  //     const list = sessionStorage.getItem('activityList')
  //     console.log('storage', list)
  //     if (list) {
  //       this.setState({
  //         activityList: list,
  //       })
  //     }
  //   }

  handleChange = value => {
    this.setState({ activityList: value })
    // TODO: Investigate the best way to save this for the API
    // console.log('event', value)
    // sessionStorage.setItem('activityList', value)
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            options={suggestions}
            name="activityList"
            value={this.state.activityList}
            onChange={this.handleChange}
            placeholder="Select activities"
            isMulti
            // Used for customizing react-select components
            // TODO: investigate why innerRef for Option crashes
            components={components}
            // TODO: look at. Currently has no visible effect?
            styles={customStyles}
            // Adjusts label of searchbox
            TextFieldProps={{
              label: 'Activities',
              InputLabelProps: {
                shrink: true,
              },
            }}
          />
        </NoSsr>
      </div>
    )
  }
}

export default withStyles(styles)(ActivityStep)
