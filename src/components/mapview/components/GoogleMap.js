import React from 'react'
import PropTypes from 'prop-types'

import GoogleMapReact from 'google-map-react'

const AMSTERDAM_CENTER = [52.3667, 4.8945]

const GoogleMap = ({ classes, children, ...props }) => (
  <GoogleMapReact
    bootstrapURLKeys={{
      key: process.env.REACT_APP_MAP_KEY,
      libraries: ['places', 'geometry'],
    }}
    defaultCenter={AMSTERDAM_CENTER}
    defaultZoom={1}
    yesIWantToUseGoogleMapApiInternals
    {...props}
  >
    {children}
  </GoogleMapReact>
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

export default GoogleMap
