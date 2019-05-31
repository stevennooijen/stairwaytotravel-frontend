import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

export default class RedirectButton extends Component {
  render() {
    return (
      <Button
        component={Link}
        to={this.props.to_url}
        // Use props if passed, otherwise use default value
        variant={this.props.variant || 'text'}
        color="primary"
      >
        {this.props.text}
      </Button>
    )
  }
}
