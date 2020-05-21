import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Icon, notification } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { authService } from '../../../services'
import styles from './style.module.scss'

@Form.create()
class Register extends Component {
  state ={
    loading: false
  }

  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        this.setState({loading: true})
        authService.signUp(values)
          .then((registeredUser) => {
            this.setState({user: registeredUser, loading: false})
          })
          .catch((err) => {
            notification.error({
              message: 'Failed',
              description: err,
            })
            this.setState({loading: false})
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

  checkAgreement = (rule, value, callback) => {
    if (!value) {
      callback('Please, confirm your agreement')
    } else {
      callback()
    }
  }

  sendToken = () => {
    const {user} = this.state;
    authService.sendToken({id:user.id}).then(res => {
      console.log(res);
    })
  }

  render() {
    const { form } = this.props
    const { loading, user } = this.state
    return (
      <div>
        <Helmet title="Register" />
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                {user &&
                  <div>
                    <h4>
                      <strong>Dear {user.name}, thank you for registration</strong>
                    </h4>
                    <p className="mb-3">Confirmation email has been sent to {user.email}.</p>
                    <p className="mb-3">Please, follow the instructions to activate your account.</p>
                    <div className="mb-3">
                      <Button type="primary" ghost onClick={this.sendToken}>
                        Resend
                      </Button>
                      {' '}
                      confirmation if you did not receive email from us.
                    </div>
                    <Link to="/user/login" className="btn">
                      &larr; Sign in to continue
                    </Link>
                  </div>
                }

                {!user &&
                  <div className={styles.form}>
                    <h4 className="text-uppercase">
                      <strong>Create your account</strong>
                    </h4>
                    <p>And start spending more time on your thoughts.</p>
                    <br />
                    <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                      <Form.Item>
                        {form.getFieldDecorator('name', {
                          rules: [{ required: true, message: 'Please input your name' }],
                        })(
                          <Input placeholder="First name" />,
                        )}
                      </Form.Item>
                      <Form.Item>
                        {form.getFieldDecorator('surname', {
                          rules: [{ required: true, message: 'Please input your last name' }],
                        })(
                          <Input placeholder="Last name" />,
                        )}
                      </Form.Item>
                      <Form.Item>
                        {form.getFieldDecorator('email', {
                          rules: [{ required: true, message: 'Please input your email address' }],
                        })(
                          <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="email"
                            placeholder="Email"
                          />,
                        )}
                      </Form.Item>
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
                            placeholder="Input your password"
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
                      <Form.Item>
                        {form.getFieldDecorator('i', {
                          valuePropName: 'checked',
                          initialValue: false,
                          rules: [
                            {
                              validator: this.checkAgreement,
                            },
                          ],
                        })(
                          <Checkbox>
                            <span className="ml-3 register-link">
                              I agree to the
                              {' '}
                              <a
                                href="javascript: void(0);"
                                className="text-primary utils__link--underlined"
                              >
                                Terms of Service
                              </a> {' '} and {' '}
                              <a
                                href="javascript: void(0);"
                                className="text-primary utils__link--underlined"
                              >
                                Privacy Policy
                              </a>
                            </span>
                          </Checkbox>
                        )}
                      </Form.Item>
                      <div className="form-actions">
                        <Button
                          type="primary"
                          className="width-150 mr-4"
                          htmlType="submit"
                          loading={loading}
                        >
                          Register
                        </Button>
                        <span className="ml-3 register-link">
                          <a
                            href="/user/login"
                            className="text-primary utils__link--underlined"
                          >
                            Sign in
                          </a>{' '}
                          if you have an account
                        </span>
                      </div>
                    </Form>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
