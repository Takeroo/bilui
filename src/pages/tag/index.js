import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import {injectIntl} from 'react-intl'
import { Helmet } from 'react-helmet'
import Feed from './feed'
import Info from './info'
import NotFoundPage from '../404'

class Home extends Component {
  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    const tagName = query.get('name');
    let redirect = false;
    if(!tagName) redirect = true;

    this.state = {
      tagName,
      redirect
    }
  }

  render() {
    const { tagName, redirect } = this.state;
    if(redirect) return (<Route component={NotFoundPage} />)
    const {intl} =  this.props;

    return (
      <div>
        <Helmet title={intl.formatMessage({id: 'home'})} />
        <div className="row">
          <div className="col-lg-2" />
          <div className="col-lg-8">
            <div className="row">
              <div className="col-lg-4">
                <Info tagName={tagName} />
              </div>
              <div className="col-lg-8">
                <Feed tagName={tagName} />
              </div>
            </div>
          </div>
          <div className="col-lg-2" />
        </div>
      </div>
    )
  }
}

export default injectIntl(Home)
