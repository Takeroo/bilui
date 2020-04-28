import React from 'react'
import styles from './style.module.scss'

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.inner}>
      <div>
        <div className="row">
          <div className="col-sm-6">
            <div>
              <span>
                © 2020{' '}
                <a href="http://bilerman.kg/" target="_blank" rel="noopener noreferrer">
                  Bilerman Software
                </a>
              </span>
            </div>
          </div>
          <div className="col-sm-6">
            <div className={styles.copyright}>
              <img
                src="/resources/images/brand/b-logo-dark.png"
                rel="noopener noreferrer"
                alt="Mediatec Software"
              />
              <span>
                © 2020{' '}
                <a href="http://bilerman.kg/" target="_blank" rel="noopener noreferrer">
                  Bilerman Software
                </a>
                <br />
                All rights reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Footer
