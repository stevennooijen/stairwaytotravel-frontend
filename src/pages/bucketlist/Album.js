import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import DestinationCard from 'components/destination'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
})

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

class Album extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              {cards.map(card => (
                <Grid item key={card} sm={6} md={4} lg={3}>
                  <DestinationCard
                    title="Test Title"
                    image={require('../../assets/pool.jpg')}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Album)
