import React from 'react'
import { Layout } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import styles from './style.module.scss'

@withRouter
class LoginLayout extends React.PureComponent {
  state = {
    backgroundNumber: 1,
    backgroundEnabled: false,
  }

  changeBackground = () => {
    const { backgroundNumber } = this.state
    this.setState({
      backgroundEnabled: true,
      backgroundNumber: backgroundNumber === 5 ? 1 : backgroundNumber + 1,
    })
  }

  toggleBackground = () => {
    const { backgroundEnabled } = this.state
    this.setState({
      backgroundEnabled: !backgroundEnabled,
    })
  }

  render() {
    const { children } = this.props
    const { backgroundNumber, backgroundEnabled } = this.state

    return (
      <Layout>
        <Layout.Content>
          <div
            className={backgroundEnabled ? `${styles.layout} ${styles.light}` : `${styles.layout}`}
            style={{
              backgroundImage: backgroundEnabled
                ? `url('/resources/images/photos/${backgroundNumber}.jpeg')`
                : `none`,
            }}
          >
            <div className={styles.header}>
              <div className={styles.logo}>
                <Link to="/">
                  {!backgroundEnabled && (
                    <img src="/resources/images/brand/bilerman-logo-dark.png" alt="Bilerman dark logo" />
                  )}
                  {backgroundEnabled && (
                    <img
                      src="/resources/images/brand/bilerman-logo-white.png"
                      alt="Bilerman light logo"
                    />
                  )}
                </Link>
              </div>
              <nav className={styles.navigation}>
                <ul className={styles.navigationItems}>
                  <li>
                    <a href="javascript: void(0);">&larr; Back</a>
                  </li>
                  <li>
                    <a className={styles.navigationActive} href="javascript: void(0);">
                      Login
                    </a>
                  </li>
                  <li>
                    <a href="javascript: void(0);">About</a>
                  </li>
                  <li>
                    <a href="javascript: void(0);">Support</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className={styles.content}>{children}</div>
            <div className={`${styles.footer} text-center`}>
              <ul className="list-unstyled list-inline mb-3">
                <li className="list-inline-item">
                  <a href="javascript: void(0);">Terms of Use</a>
                </li>
                <li className="list-inline-item">
                  <a href="javascript: void(0);">Support</a>
                </li>
                <li className="list-inline-item">
                  <a href="javascript: void(0);">Contacts</a>
                </li>
              </ul>
              <p>&copy; 2020 Bilerman. All rights reserved.</p>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    )
  }
}

export default LoginLayout
