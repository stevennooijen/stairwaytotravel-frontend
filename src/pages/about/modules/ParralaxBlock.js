import React from 'react'
import { Parallax } from 'react-parallax'

function ParallaxBlock(props) {
  return (
    <div>
      {/* -----basic config-----*/}
      <Parallax
        bgImage={props.imageUrl}
        // TODO: in future add alt texts to each image
        // bgImageAlt={props.imageAlt}
        strength={200}
      >
        <div style={{ height: '500px' }} />
      </Parallax>
    </div>
  )
}

export default ParallaxBlock
