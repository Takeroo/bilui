import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import HomeMenu from './HomeMenu'
import ProfileMenu from './ProfileMenu'
import LanguageSelector from './LanguageSelector'
import styles from './style.module.scss'

class TopBar extends React.Component {
  render() {
    return (
      <div className={styles.topbar}>
        <div className={`${styles.parentBig} mr-4`}>
          <div className={styles.logo}>
            <Link to="/">
              <img
                src="/resources/images/brand/bilerman-logo-dark.png"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className={`${styles.parentSmall} mr-4`}>
          <div className={styles.logo}>
            <Link to="/">
              <img
                src="/resources/images/brand/b-logo-dark.png"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="mr-4">
          <a className={styles.title} href="/#/home">
            <FormattedMessage id="topBar.blogs" />
          </a>
          <a className={styles.icon} href="/#/home">
            <i className="fa fa-newspaper-o" />
          </a>
        </div>
        <div className="mr-4">
          <a className={styles.title} href="http://forum.sownoon.com/">
            <FormattedMessage id="topBar.forum" />
          </a>
          <a className={styles.icon} href="http://forum.sownoon.com/">
            <i className="fa fa-comments-o" />
          </a>
        </div>
        <div className="mr-4">
          <a className={styles.title} href="http://sabak.sownoon.com/">
            <FormattedMessage id="topBar.courses" />
          </a>
          <a className={styles.icon} href="http://sabak.sownoon.com/">
            <i className="fa fa-book" />
          </a>
        </div>
        <div className="mr-auto" />
        <div className="mr-4">
          <div className={styles.logo}>
            <a className={styles.navigationActive} href="/#/author/profile?id=23">
              <img
                src="/resources/images/brand/ilim-tech-logo-icon.png"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="mr-4">
          <LanguageSelector />
        </div>
        <div className="mr-4" style={{display: 'none'}}>
          <HomeMenu />
        </div>
        <ProfileMenu />
      </div>
    )
  }
}

export default TopBar
