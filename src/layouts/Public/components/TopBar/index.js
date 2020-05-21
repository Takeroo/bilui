import React from 'react'
import { Link } from 'react-router-dom'
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
          <LanguageSelector />
        </div>
        <div className="mr-4">
          <a className={styles.navigationActive} href="/user/login">
            Login
          </a>
        </div>
        <a className={styles.navigationActive} href="/user/register">
          Register
        </a>
      </div>
    )
  }
}

export default TopBar
