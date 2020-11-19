import React, { Component } from 'react'
import {injectIntl} from 'react-intl'
import { Helmet } from 'react-helmet'
import Feed from './feed'

class Home extends Component {
  render() {
    const {intl} =  this.props;
    return (
      <div>
        <Helmet title={intl.formatMessage({id: 'home'})} />
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

export default injectIntl(Home)
