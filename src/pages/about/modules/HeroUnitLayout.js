import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import ExpandMore from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '70vh',
    // [theme.breakpoints.up('sm')]: {
    //   height: '100vh',
    //   minHeight: 500,
    //   maxHeight: 1300,
    // },
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    zIndex: -1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
  },
  arrowDown: {
    position: 'absolute',
    bottom: theme.spacing(4),
  },
})

function HeroUnitLayout(props) {
  const { backgroundClassName, children, classes, scrollTo } = props

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {/* Enter all content on top of background image */}
        {children}
        {/* shades the background image */}
        <div className={classes.backdrop} />
        {/* background image is passed here */}
        <div className={clsx(classes.background, backgroundClassName)} />
        <ExpandMore
          className={classes.arrowDown}
          height="16"
          width="12"
          alt="arrow down"
          onClick={scrollTo}
        />
      </Container>
    </section>
  )
}

HeroUnitLayout.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HeroUnitLayout)
