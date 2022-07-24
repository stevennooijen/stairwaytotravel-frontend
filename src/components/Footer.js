import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import InstagramIcon from '@material-ui/icons/Instagram'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import FacebookIcon from '@material-ui/icons/Facebook'

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
    // For aligning the SM icons
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
})

class Footer extends React.Component {
  render() {
    const { classes } = this.props

    return (
      // maxWidth false needed to span entire screen
      <Container component="footer" maxWidth={false} className={classes.footer}>
        <div>
          <ul>
            <li>
              <Link
                component={RouterLink}
                to="/"
                variant="subtitle1"
                color="textSecondary"
                onClick={() => window.scrollTo(0, 0)}
              >
                © 2020 Stairway to Travel
              </Link>
            </li>
            {window.location.pathname !== '/about' && (
              <li>
                <Link
                  component={RouterLink}
                  to="/about"
                  variant="subtitle1"
                  color="secondary"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  About
                </Link>
              </li>
            )}
            {!window.location.pathname.startsWith('/blog') && (
              <li>
                <Link
                  component={RouterLink}
                  to="/blog/why-open-source-and-lessons-learned"
                  variant="subtitle1"
                  color="secondary"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Blog
                </Link>
              </li>
            )}
            <li>
              <Link
                href="mailto:info.stairwaytotravel@gmail.com?subject=Question about Stairway to Travel: ..."
                variant="subtitle1"
                color="secondary"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li>
              <Link
                href="https://www.instagram.com/stairwaytotravel/"
                target="_blank"
                rel="noopener"
              >
                <InstagramIcon color="secondary" />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/stairwaytotravel"
                target="_blank"
                rel="noopener"
              >
                <FacebookIcon color="secondary" />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/company/stairwaytotravel"
                target="_blank"
                rel="noopener"
              >
                <LinkedInIcon color="secondary" />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    )
  }
}

export default withStyles(styles)(Footer)
