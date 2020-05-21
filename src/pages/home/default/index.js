import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Feed from './feed'

class Home extends Component {
  render() {
    return (
      <div>
        <Helmet title="Home" />
        <div className="row">
          <div className="col-lg-2" />
          <div className="col-lg-8">
            <Feed />
          </div>
          <div className="col-lg-2" />
        </div>
      </div>
    )
  }
}

export default Home
