import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Button, Tabs } from 'antd'
import { Helmet } from 'react-helmet'
import PagedDrafts from './pagedDrafts'
import style from './style.module.scss'

const { TabPane } = Tabs

@connect(({ user }) => ({ user }))
class ProfileApp extends React.Component {

  render() {
    const { user, intl } = this.props;
    return (
      <div>
        <Helmet title={intl.formatMessage({id: 'author.drafts'})} />
        <div className={style.profile}>
          <div className="row">
            <div className="col-xl-12">
              <div className={`card card-body mb-4 ${style.socialInfo}`}>
                <div>
                  <h2>
                    <span className="text-black mr-2">
                      <strong><FormattedMessage id='author.drafts.stories' /></strong>
                    </span>
                  </h2>
                </div>
                <div className={style.socialCounts}>
                  <a href="/#/article/edit">
                    <Button type="primary" ghost>
                      <i className="icmn-quill mr-2" />
                      <FormattedMessage id='author.drafts.write' />
                    </Button>
                  </a>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <Tabs defaultActiveKey="1">
                    <TabPane
                      tab={
                        <span>
                          <i className="icmn-stack mr-1" />
                          <FormattedMessage id='author.drafts' />
                        </span>
                      }
                      key="1"
                    >
                      <PagedDrafts user={user} published={false} />
                    </TabPane>
                    <TabPane
                      tab={
                        <span>
                          <i className="icmn-menu mr-1" />
                          <FormattedMessage id='author.drafts.published' />
                        </span>
                      }
                      key="2"
                    >
                      <PagedDrafts user={user} published />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(ProfileApp)
