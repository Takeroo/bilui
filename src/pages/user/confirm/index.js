import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link, Route } from 'react-router-dom'
import Loader from 'components/LayoutComponents/Loader'
import {authService} from '../../../services'
import styles from './style.module.scss'
import NotFoundPage from '../../404'

class Confirm extends Component {
  state ={
    token: true,
    user: {},
    loading: true
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get('token');
    if(!token){
      this.setState({token: false});
    }
    else{
      authService.confirmToken(token).then(result =>{
        this.setState({user: result, loading: false, success: true});
      }).catch((err) =>{
        this.setState({loading: false, failure: true, message: err});
      })
    }
  }

  render() {
    const {  token, user, loading, success, failure, message } = this.state
    if(!token) return (<Route component={NotFoundPage} />)
    return (
      <div>
        <Helmet title="Register" />
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              {loading && <Loader />}
              {success &&
                <div className={styles.inner}>
                  <div>
                    <h4>
                      <strong>Hey {user.name}, thank you for your registration.</strong>
                    </h4>
                    <p className="mb-3">Your email {user.email} has been verified.</p>
                    <Link to="/user/login" className="btn">
                      &larr; Sign in to continue
                    </Link>
                  </div>
                </div>
              }
              {failure &&
                <div className={styles.inner}>
                  <div>
                    <h4>
                      <strong>Email address was not verified</strong>
                    </h4>
                    <p className="mb-3">Please, see the below message to know what went wrong</p>
                    <p className="mb-3">{ message }</p>
                    <Link to="/user/login" className="btn">
                      &larr; Sign in to continue
                    </Link>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Confirm
