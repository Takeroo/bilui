import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import LiveSearch from './LiveSearch'
import LanguageSelector from './LanguageSelector'
import styles from './style.module.scss'

class TopBar extends React.Component {
  render() {
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
        <div className="mr-auto" />
        <div className="mr-auto" style={{display: 'none'}}>
          <LiveSearch />
        </div>
        <div className="mr-4">
          <div className={styles.logo}>
            <a className={styles.navigationActive} href="/#/author/profile?id=23">
              <img
                src="/resources/images/brand/ilim-tech-logo.png"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="mr-4">
          <LanguageSelector />
        </div>
        <div className="mr-4">
          <a className={styles.navigationActive} href="/#/user/login">
            <FormattedMessage id="topBar.login" />
          </a>
        </div>
        <a className={styles.navigationActive} href="/#/user/register">
          <FormattedMessage id="topBar.register" />
        </a>
      </div>
    )
  }
}

export default TopBar
