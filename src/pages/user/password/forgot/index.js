import React, { Component } from 'react'
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
    const { form } = this.props
    const { loading, success } = this.state
    return (
      <div>
        <Helmet title="Forgot" />
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                {!success &&
                  <div className={styles.form}>
                    <h4 className="text-uppercase">
                      <strong>Restore Password</strong>
                    </h4>
                    <br />
                    <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                      <Form.Item label="Email address">
                        {form.getFieldDecorator('email', {
                          initialValue: '',
                          rules: [{ required: true, message: 'Please input email' }],
                        })(<Input size="default" type="email" />)}
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
                          Restore Password
                        </Button>
                      </div>
                    </Form>
                  </div>
                }
                {success &&
                  <div>
                    <h4>
                      <strong>Instructions has been sent to your email.</strong>
                    </h4>
                    <p className="mb-3">Please, follow the instructions to reset your password.</p>
                    <Link to="/user/login" className="btn">
                      &larr; Sign in to continue
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

export default Forgot
