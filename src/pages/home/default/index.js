import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Latest from './latest'

class Home extends Component {
  render() {
    return (
      <div>
        <Helmet title="Home" />
        <Latest />
      </div>
    )
  }
}

export default Home
