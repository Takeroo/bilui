import React from 'react'
import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import Info from './info'
import Feed from './feed'
import NotFoundPage from '../../404'
import { userService } from '../../../services/user'
import styles from './style.module.scss'


@connect(({ user }) => ({ user }))
class Profile extends React.Component {

  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    const id = query.get('id');
    let userId;
    let redirect = false;
    if(!id){
      const { user } = this.props;
      if(user && user.id){
        userId = user.id;
      }
      else redirect = true;
    }
    else userId = id;

    this.state = {
      id: userId,
      redirect
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const { id } = this.state;
    userService.getUser(id)
      .then(result => {
        this.setState({ user: result})
      })
      .catch(() => {
        this.setState({ redirect: true})
      })
  }

  updateUser = (user) => {
    this.setState({ user})
  }

  render() {
    const { user, redirect } = this.state;
    if(redirect) return (<Route component={NotFoundPage} />)

    return (
      <div>
        <Helmet title="User Profile" />
        <div className={styles.block}>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-12">
                      {user && <Info author={user} updateUser={this.updateUser} /> }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              {user && <Feed author={user} updateUser={this.updateUser} /> }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
