import React from 'react'
import PropTypes from 'prop-types'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'

// Taken from hidden app-bar example: https://material-ui.com/components/app-bar/
function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide
      appear={false}
      direction="up"
      // make sure appbar doesn't display when on top of certain pages, or when map is open
      in={!trigger}
    >
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
}

export default HideOnScroll
