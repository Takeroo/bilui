import React from 'react'
import { Helmet } from 'react-helmet'
import ProfileHead from './components/ProfileHead'
import BlogFeed from './components/feed'
import styles from './style.module.scss'


class Profile extends React.Component {

  render() {
    return (
      <div>
        <Helmet title="Dashboard Beta" />
        <div className={styles.block}>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-12">
                      <ProfileHead />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <BlogFeed />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
