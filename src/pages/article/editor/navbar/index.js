import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Button } from 'antd'
import ProfileMenu from '../../../../layouts/Main/components/TopBar/ProfileMenu'
import LanguageSelector from '../../../../layouts/Main/components/TopBar/LanguageSelector'
import styles from './style.module.scss'

class TopBar extends React.Component {
  render() {
    const {syncStatus, toggleForm} = this.props
    return (
      <div className={styles.topbar}>
        <div className="mr-4">
          <div className={styles.logo}>
            <Link to="/">
              <img
                src="/resources/images/brand/bilerman-logo-dark.png"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="style_descr__1Gp1J">
          {syncStatus && <FormattedMessage id={`topBar.${syncStatus}`} /> }
        </div>
        <div className="mr-auto" />
        <div className="mr-4">
          <Button type="default" onClick={() => toggleForm()}>
            <i className='fa fa-globe mr-2' />
            <FormattedMessage id="topBar.publish" />
          </Button>
        </div>
        <div className="mr-4">
          <LanguageSelector />
        </div>
        <ProfileMenu />
      </div>
    )
  }
}

export default TopBar
