import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input, Button, Checkbox } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './style.module.scss'

@Form.create()
@connect(({ user }) => ({ user }))
class Login extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'user/LOGIN',
          payload: values,
        })
      }
    })
  }

  render() {
    const {
      form,
      user: { loading },
      intl,
    } = this.props

    return (
      <div>
        <Helmet title={intl.formatMessage({id:'user.login'})} />
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                <div className={styles.form}>
                  <h4 className="text-uppercase">
                    <strong><FormattedMessage id="user.login.header" /></strong>
                  </h4>
                  <br />
                  <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                    <Form.Item label={intl.formatMessage({id:'user.login.email'})}>
                      {form.getFieldDecorator('email', {
                        rules: [{ required: true, message: intl.formatMessage({id:'user.login.emailMessage'}) }],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <Form.Item label={intl.formatMessage({id:'user.login.password'})}>
                      {form.getFieldDecorator('password', {
                        rules: [{ required: true, message: intl.formatMessage({id:'user.login.passwordMessage'}) }],
                      })(<Input size="default" type="password" />)}
                    </Form.Item>
                    <Form.Item>
                      {form.getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                      })(<Checkbox><FormattedMessage id="user.login.remember" /></Checkbox>)}
                      <Link
                        to="/user/password/forgot"
                        className="utils__link--blue utils__link--underlined pull-right"
                      >
                        <FormattedMessage id="user.login.forgotPassword" />
                      </Link>
                    </Form.Item>
                    <div className="form-actions">
                      <Button
                        type="primary"
                        className="width-150 mr-4"
                        htmlType="submit"
                        loading={loading}
                      >
                        <FormattedMessage id="user.login" />
                      </Button>
                      <span className="ml-3 register-link">
                        <a
                          href="/#/user/register"
                          className="text-primary utils__link--underlined"
                        >
                          <FormattedMessage id="user.login.register" />
                        </a>{' '}
                        <FormattedMessage id="user.login.registerMessage" />
                      </span>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(Login)
