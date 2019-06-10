import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px 0`,
  },
})

class Album extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={40}>
          {/* Album passes along children components as provided through props */}
          {this.props.children}
        </Grid>
      </div>
    )
  }
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Album)
