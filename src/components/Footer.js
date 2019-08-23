import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

const styles = theme => ({
  '@global': {
    ul: {
      // remove all kinds of default margin and padding accompanied with ul
      margin: 0,
      padding: 0,
    },
    li: {
      // listStyle none might be needed to remove bullets
      // listStyle: 'none',
      // Use inline-blocks instead of inline to avoid text being split over lines
      display: 'inline-block',
      margin: theme.spacing(1),
      // When small screen, display centered blocks below each other
      [theme.breakpoints.down('xs')]: {
        display: 'block',
        textAlign: 'center',
      },
    },
  },
  footer: {
    // Style the footer container
    backgroundColor: theme.palette.background.default,
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
})

class Footer extends React.Component {
  render() {
    const { classes } = this.props

    return (
      // maxWidth false needed to span entire screen
      <Container component="footer" maxWidth={false} className={classes.footer}>
        <ul>
          <li>
            <Link href="/" variant="subtitle1" color="textSecondary">
              © 2019 Stairway.travel
            </Link>
          </li>
          <li>
            <Link href="/about" variant="subtitle1">
              About
            </Link>
          </li>
          <li>
            <Link
              href="mailto:steven.nooijen@gmail.com?subject=Question about Stairway.travel: ..."
              variant="subtitle1"
            >
              Contact
            </Link>
          </li>
        </ul>
      </Container>
    )
  }
}

export default withStyles(styles)(Footer)
