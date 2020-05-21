import React from 'react'
import { withRouter } from 'react-router-dom'

@withRouter
class CleanLayout extends React.PureComponent {
  render() {
    const { children } = this.props
    return children
  }
}

export default CleanLayout
