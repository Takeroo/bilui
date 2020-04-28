import React from 'react'
import { Menu, Dropdown, Badge } from 'antd'
import styles from './style.module.scss'

class HomeMenu extends React.Component {
  state = {
    count: 1,
  }

  addCount = () => {
    let { count } = this.state
    count += 1
    this.setState({
      count,
    })
  }

  render() {
    const { count } = this.state
    const menu = (
      <Menu selectable={false} className={styles.activity}>
        <Menu.Item className={styles.item}>
          <i className={`${styles.icon} icmn-star-full`} />
          <div className={styles.inner}>
            <div className={styles.title}>
              <span className="pull-right">now</span>
              <a href="javascript: void(0);">
                Update Status: <span className="badge badge-danger">New</span>
              </a>
            </div>
            <div className={styles.descr}>
              Failed to get available update data. To ensure the proper functioning of your
              application, update now.
            </div>
          </div>
        </Menu.Item>
        <Menu.Item className={styles.item}>
          <i className={`${styles.icon} icmn-stack`} />
          <div className={styles.inner}>
            <div className={styles.title}>
              <span className="pull-right">24 min ago</span>
              <a href="javascript: void(0);">
                Income: <span className="badge badge-default">$299.00</span>
              </a>
            </div>
            <div className={styles.descr}>
              Failed to get available update data. To ensure the proper functioning of your
              application, update now.
            </div>
          </div>
        </Menu.Item>
        <Menu.Item className={styles.item}>
          <i className={`${styles.icon} icmn-list`} />
          <div className={styles.inner}>
            <div className={styles.title}>
              <span className="pull-right">30 min ago</span>
              <a href="javascript: void(0);">Inbox Message</a>
            </div>
            <div className={styles.descr}>
              From: <a href="javascript: void(0);">David Bowie</a>
            </div>
          </div>
        </Menu.Item>
        <Menu.Item className={styles.item}>
          <i className={`${styles.icon} icmn-home`} />
          <div className={styles.inner}>
            <div className={styles.title}>
              <span className="pull-right">now</span>
              <a href="javascript: void(0);">
                Update Status: <span className="badge badge-primary">New</span>
              </a>
            </div>
            <div className={styles.descr}>
              Failed to get available update data. To ensure the proper functioning of your
              application, update now.
            </div>
          </div>
        </Menu.Item>
        <Menu.Item className={styles.item}>
          <i className={`${styles.icon} icmn-loop`} />
          <div className={styles.inner}>
            <div className={styles.title}>
              <span className="pull-right">24 min ago</span>
              <a href="javascript: void(0);">
                Income: <span className="badge badge-warning">$299.00</span>
              </a>
            </div>
            <div className={styles.descr}>
              Failed to get available update data. To ensure the proper functioning of your
              application, update now.
            </div>
          </div>
        </Menu.Item>
        <Menu.Item className={styles.item}>
          <i className={`${styles.icon} icmn-cog utils__spin-delayed--pseudo-selector`} />
          <div className={styles.inner}>
            <div className={styles.title}>
              <span className="pull-right">30 min ago</span>
              <a href="javascript: void(0);">Inbox Message</a>
            </div>
            <div className={styles.descr}>
              From: <a href="javascript: void(0);">David Bowie</a>
            </div>
          </div>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']} onVisibleChange={this.addCount}>
        <div className={styles.dropdown}>
          <Badge count={count}>
            <i className="icmn-home topbar__dropdownIcon" />
          </Badge>
        </div>
      </Dropdown>
    )
  }
}

export default HomeMenu
