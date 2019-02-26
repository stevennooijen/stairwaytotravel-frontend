import React, { Component } from 'react'

// Destination class has no state, but gets destination data in through props
class Destination extends Component {
  // state = {  }
  render() {
    return (
      // className is used to give the div an id
      <div className="destination">
        <div>
          <p>
            My retrieved destination:
            {this.props.name ? this.props.name : 'loading...'}
          </p>
        </div>
      </div>
    )
  }
}

export default Destination
