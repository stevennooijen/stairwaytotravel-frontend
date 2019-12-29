import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import GoogleMapReact from 'google-map-react'

const styles = theme => ({
  wrapper: {
    // This is a hard requirement for GoogleMapReact to display. Don't change!
    width: '100%',
    height: '100vh',
  },
})

const GoogleMap = ({ classes, children, ...props }) => (
  <div className={classes.wrapper}>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_MAP_KEY,
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </div>
)

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

GoogleMap.defaultProps = {
  children: null,
}

// export default GoogleMap
export default withStyles(styles)(GoogleMap)
