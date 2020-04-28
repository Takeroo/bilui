import React, { Component } from 'react'
import { Form, Input, Button, notification, Icon } from 'antd'
import { Helmet } from 'react-helmet'
import { Link, Route } from 'react-router-dom'
import Loader from 'components/LayoutComponents/Loader'
import styles from './style.module.scss'
import { authService } from '../../../../services'
import NotFoundPage from '../../../404'

@Form.create()
class Reset extends Component {
  state ={
    tokenLoad: true,
    loading: false,
    token: true
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get('token');
    if(!token){
      this.setState({token: false});
    }
    else{
      authService.confirmPasswordResetToken(token).then(result =>{
        this.setState({user: result, tokenLoad: false, valid: true});
      }).catch((err) =>{
        this.setState({tokenLoad: false, invalid: true, message: err});
      })
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    const { user } = this.state
    form.validateFields((error, values) => {
      if (!error) {
        this.setState({loading: true});
        user.password = values.password
        authService.resetPassword(user)
          .then(() => {
            this.setState({loading: false, valid: false, success: true});
          })
          .catch((err) => {
            notification.error({
              message: 'Failed',
              description: err,
            })
            this.setState({loading: false});
          })
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Your password and confirmation does not match!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    const { confirmDirty } = this.state
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    const { confirmDirty } = this.state
    this.setState({
      confirmDirty: confirmDirty || !!value,
    })
  }

  render() {
    const { form } = this.props
    const { loading, valid, invalid, token, tokenLoad, message, user, success } = this.state
    if(!token) return (<Route component={NotFoundPage} />)

    return (
      <div>
        <Helmet title="Forgot" />
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              {tokenLoad && <Loader />}
              {success &&
                <div className={styles.inner}>
                  <div>
                    <h4 className="text-uppercase">
                      <strong>Password updated</strong>
                    </h4>
                    <p className="mb-3">Your password has been successfully updated</p>
                    <Link to="/user/login" className="btn">
                      &larr; Sign in to continue
                    </Link>
                  </div>
                </div>
              }
              {valid &&
                <div className={styles.inner}>
                  <div className={styles.form}>
                    <h4 className="text-uppercase">
                      <strong>Reset Password</strong>
                    </h4>
                    <p className="mb-3">Hey {user.name}, please reset your password</p>
                    <br />
                    <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                      <Form.Item hasFeedback>
                        {form.getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your password'
                            },
                            {
                              validator: this.validateToNextPassword,
                            },
                          ],
                        })(
                          <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="New password"
                          />,
                        )}
                      </Form.Item>
                      <Form.Item hasFeedback>
                        {form.getFieldDecorator('confirm', {
                          rules: [
                            {
                              required: true,
                              message: 'Please confirm your password'
                            },
                            {
                              validator: this.compareToFirstPassword,
                            },
                          ],
                        })(
                          <Input
                            type="password"
                            onBlur={this.handleConfirmBlur}
                            placeholder="Confirm your password"
                          />,
                        )}
                      </Form.Item>
                      <div className="mb-2">
                        <Link to="/user/login" className="utils__link--blue utils__link--underlined">
                          Back to login
                        </Link>
                      </div>
                      <div className="form-actions">
                        <Button
                          type="primary"
                          className="width-150 mr-4"
                          htmlType="submit"
                          loading={loading}
                        >
                          Reset Password
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              }

              {invalid &&
                <div className={styles.inner}>
                  <div>
                    <h4>
                      <strong>Your password reset link is not valid</strong>
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

export default Reset
