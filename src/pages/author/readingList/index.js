import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Helmet } from 'react-helmet'
import { Tabs } from 'antd'
import Feed from './feed'
import styles from './style.module.scss'

const { TabPane } = Tabs

class Profile extends React.Component {

  render() {
    const { intl } = this.props;

    return (
      <div>
        <Helmet title={intl.formatMessage({id: 'author.readingList'})} />
        <div className={styles.block}>
          <div className="row">
            <div className="col-lg-12">
              <div className="utils__title mb-3">
                <strong><FormattedMessage id="author.readingList" /></strong>
              </div>
            </div>
            <div className="col-lg-12">
              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={
                    <span>
                      <i className="icmn-bookmarks mr-1" />
                      <FormattedMessage id='author.readingList.bookmarks' />
                    </span>
                  }
                  key="1"
                >
                  <Feed type="bookmarks" updateUser={this.updateUser} />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <i className="icmn-star-empty mr-1" />
                      <FormattedMessage id='author.readingList.clapped' />
                    </span>
                  }
                  key="2"
                >
                  <Feed type="clapped" updateUser={this.updateUser} />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(Profile)
