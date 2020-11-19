import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input, Button, notification } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'
import { authService } from '../../../../services'

@Form.create()
class Forgot extends Component {
  state ={
    loading: false
  }

  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        this.setState({loading: true});
        authService.requestPasswordResetLink(values.email)
          .then(() => {
            this.setState({loading: false, success: true});
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

  render() {
    const { form, intl } = this.props
    const { loading, success } = this.state
    return (
      <div>
        <Helmet title={intl.formatMessage({id:'user.password.forgot'})} />
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                {!success &&
                  <div className={styles.form}>
                    <h4 className="text-uppercase">
                      <strong><FormattedMessage id="user.password.forgot.restore" /></strong>
                    </h4>
                    <br />
                    <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                      <Form.Item label={intl.formatMessage({id:'user.password.forgot.email'})}>
                        {form.getFieldDecorator('email', {
                          initialValue: '',
                          rules: [{ required: true, message: intl.formatMessage({id:'user.password.forgot.emailMessage'}) }],
                        })(<Input size="default" type="email" />)}
                      </Form.Item>
                      <div className="mb-2">
                        <Link to="/user/login" className="utils__link--blue utils__link--underlined">
                          <FormattedMessage id="user.password.forgot.back" />
                        </Link>
                      </div>
                      <div className="form-actions">
                        <Button
                          type="primary"
                          className="width-150 mr-4"
                          htmlType="submit"
                          loading={loading}
                        >
                          <FormattedMessage id="user.password.forgot.restore" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                }
                {success &&
                  <div>
                    <h4>
                      <strong><FormattedMessage id="user.password.forgot.instructions" /></strong>
                    </h4>
                    <p className="mb-3"><FormattedMessage id="user.password.forgot.instructionsMessage" /></p>
                    <Link to="/user/login" className="btn">
                      &larr;  <FormattedMessage id="user.password.forgot.continue" />
                    </Link>
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

export default injectIntl(Forgot)
