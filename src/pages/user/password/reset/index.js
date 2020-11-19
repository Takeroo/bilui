import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
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
    const { form, intl } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback(intl.formatMessage({ id: 'user.password.reset.confirmationError'}))
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
    const { form, intl } = this.props
    const { loading, valid, invalid, token, tokenLoad, message, user, success } = this.state
    if(!token) return (<Route component={NotFoundPage} />)

    return (
      <div>
        <Helmet title={intl.formatMessage({id:'user.password.reset'})} />
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              {tokenLoad && <Loader />}

              {success &&
                <div className={styles.inner}>
                  <div>
                    <h4 className="text-uppercase">
                      <FormattedMessage id="user.password.reset.updated" />
                    </h4>
                    <p className="mb-3"><FormattedMessage id="user.password.reset.updatedMessage" /></p>
                    <Link to="/user/login" className="btn">
                      &larr; <FormattedMessage id="user.password.reset.continue" />
                    </Link>
                  </div>
                </div>
              }

              {valid &&
                <div className={styles.inner}>
                  <div className={styles.form}>
                    <h4 className="text-uppercase">
                      <strong><FormattedMessage id="user.password.reset" /></strong>
                    </h4>
                    <p className="mb-3">
                      <FormattedMessage id="user.password.reset.hi" />
                      { ` ${user.name}, `}
                      <FormattedMessage id="user.password.reset.resetPassword" />
                    </p>
                    <br />
                    <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                      <Form.Item hasFeedback>
                        {form.getFieldDecorator('password', {
                          rules: [
                            {
                              required: true,
                              message: intl.formatMessage({id:'user.password.reset.newPasswordMessage'})
                            },
                            {
                              validator: this.validateToNextPassword,
                            },
                          ],
                        })(
                          <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder={intl.formatMessage({id:'user.password.reset.newPassword'})}
                          />,
                        )}
                      </Form.Item>
                      <Form.Item hasFeedback>
                        {form.getFieldDecorator('confirm', {
                          rules: [
                            {
                              required: true,
                              message: intl.formatMessage({id:'user.password.reset.confirmPasswordMessage'})
                            },
                            {
                              validator: this.compareToFirstPassword,
                            },
                          ],
                        })(
                          <Input
                            type="password"
                            onBlur={this.handleConfirmBlur}
                            placeholder={intl.formatMessage({id:'user.password.reset.confirmPassword'})}
                          />,
                        )}
                      </Form.Item>
                      <div className="mb-2">
                        <Link to="/user/login" className="utils__link--blue utils__link--underlined">
                          <FormattedMessage id="user.password.reset.back" />
                        </Link>
                      </div>
                      <div className="form-actions">
                        <Button
                          type="primary"
                          className="width-150 mr-4"
                          htmlType="submit"
                          loading={loading}
                        >
                          <FormattedMessage id="user.password.reset" />
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
                      <strong><FormattedMessage id="user.password.reset.invalidLink" /></strong>
                    </h4>
                    <p className="mb-3"><FormattedMessage id="user.password.reset.invalidLinkMessage" /></p>
                    <p className="mb-3">{ message }</p>
                    <Link to="/user/login" className="btn">
                      &larr; <FormattedMessage id="user.password.reset.continue" />
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

export default injectIntl(Reset)
