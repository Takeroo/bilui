import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Icon, notification } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { FormattedMessage, injectIntl } from 'react-intl'
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
      const {intl} = this.props;
      callback(intl.formatMessage({id: 'user.register.passwordConfirmMessage'}))
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
      const {intl} = this.props;
      callback(intl.formatMessage({id: 'user.register.agreementMessage'}))
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
    const { form, intl } = this.props
    const { loading, user } = this.state
    return (
      <div>
        <Helmet title={intl.formatMessage({id:'user.register'})} />
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                {user &&
                  <div>
                    <h4>
                      <strong>
                        <FormattedMessage id="user.register.hi" />
                        {user.name},
                        <FormattedMessage id="user.register.thanks" />
                      </strong>
                    </h4>
                    <p className="mb-3"><FormattedMessage id="user.register.confirmationEmail" /> {user.email}.</p>
                    <p className="mb-3"><FormattedMessage id="user.register.instructions" /></p>
                    <div className="mb-3">
                      <Button type="primary" ghost onClick={this.sendToken}>
                        <FormattedMessage id="user.register.resend" />
                      </Button>
                      {' '}
                      <FormattedMessage id="user.register.resendMessage" />
                    </div>
                    <Link to="/user/login" className="btn">
                      &larr; <FormattedMessage id="user.register.continue" />
                    </Link>
                  </div>
                }

                {!user &&
                  <div className={styles.form}>
                    <h4 className="text-uppercase">
                      <strong><FormattedMessage id="user.register.header" /></strong>
                    </h4>
                    <p><FormattedMessage id="user.register.subtitle" /></p>
                    <br />
                    <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                      <Form.Item>
                        {form.getFieldDecorator('name', {
                          rules: [{ required: true, message: intl.formatMessage({id:'user.register.nameMessage'}) }],
                        })(
                          <Input placeholder={intl.formatMessage({id:'user.register.name'})} />,
                        )}
                      </Form.Item>
                      <Form.Item>
                        {form.getFieldDecorator('surname', {
                          rules: [{ required: true, message: intl.formatMessage({id:'user.register.surnameMessage'}) }],
                        })(
                          <Input placeholder={intl.formatMessage({id:'user.register.surname'})} />,
                        )}
                      </Form.Item>
                      <Form.Item>
                        {form.getFieldDecorator('email', {
                          rules: [{ required: true, message: intl.formatMessage({id:'user.register.emailMessage'}) }],
                        })(
                          <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="email"
                            placeholder={intl.formatMessage({id:'user.register.email'})}
                          />,
                        )}
                      </Form.Item>
                      <Form.Item hasFeedback>
                        {form.getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: intl.formatMessage({id:'user.register.passwordMessage'})
                            },
                            {
                              validator: this.validateToNextPassword,
                            },
                          ],
                        })(
                          <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder={intl.formatMessage({id:'user.register.password'})}
                          />,
                        )}
                      </Form.Item>
                      <Form.Item hasFeedback>
                        {form.getFieldDecorator('confirm', {
                          rules: [
                            {
                              required: true,
                              message: intl.formatMessage({id:'user.register.confirmMessage'})
                            },
                            {
                              validator: this.compareToFirstPassword,
                            },
                          ],
                        })(
                          <Input
                            type="password"
                            onBlur={this.handleConfirmBlur}
                            placeholder={intl.formatMessage({id:'user.register.confirm'})}
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
                              <FormattedMessage id="user.register.agreement" />
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
                          <FormattedMessage id="user.register" />
                        </Button>
                        <span className="ml-3 register-link">
                          <a
                            href="/#/user/login"
                            className="text-primary utils__link--underlined"
                          >
                            <FormattedMessage id="user.register.login" />
                          </a>{' '}
                          <FormattedMessage id="user.register.loginMessage" />
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

export default injectIntl(Register)
