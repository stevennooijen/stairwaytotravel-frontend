import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: theme.palette.background.paper,
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 400,
    padding: theme.spacing(3, 3),
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  imageContainer: {
    maxHeight: 360,
    overflow: 'hidden',
    borderRadius: '2%',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
  },
  imageSubtitle: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
})

class AboutCompany extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <Container className={classes.root} component="section" maxWidth={false}>
        <Grid container>
          <Grid item xs={12} md={6} className={classes.cardWrapper}>
            <Card className={classes.card}>
              <Typography variant="h2" paragraph>
                About us
              </Typography>
              <Typography paragraph>
                Stairway to Travel offers personalized travel recommendations
                that help you shape unique itineraries.
              </Typography>
              <Typography paragraph>
                We believe that travel research should be inspiring, fun and
                easy. We do this by giving you personalized, uncommercial, and
                trustworthy advice. We aim to surprise you with unique
                destinations that you would otherwise never have thought of. All
                recommendations are based on machine learning and natural
                language processing techniques. Read about our startup journey
                in{' '}
                <Link
                  component={RouterLink}
                  to="/blog/why-open-source-and-lessons-learned"
                  variant="subtitle1"
                  color="secondary"
                  onClick={() => window.scrollTo(0, 0)}
                  underline="always"
                >
                  our blog
                </Link>
                .
              </Typography>
              <Typography paragraph>
                If you have any questions, suggestions or feedback, feel free to{' '}
                <Link
                  href="mailto:steven@stairwaytotravel.com?subject=Question about Stairway to Travel: ..."
                  variant="subtitle1"
                  color="secondary"
                  underline="always"
                >
                  contact us
                </Link>
                !
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} className={classes.cardWrapper}>
            <Card className={classes.card}>
              <div className={classes.imageContainer}>
                <img
                  src={require('../../../assets/img/used/me-sailing-compressed.jpg')}
                  alt="Founder Steven Nooijen"
                  className={classes.image}
                />
              </div>
              <Typography className={classes.imageSubtitle} variant="subtitle1">
                Steven Nooijen - Founder -{' '}
                <Link
                  href="https://www.linkedin.com/in/stevennooijen/"
                  color="secondary"
                  target="_blank"
                  rel="noopener"
                  underline="always"
                >
                  Linkedin
                </Link>
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

AboutCompany.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AboutCompany)
