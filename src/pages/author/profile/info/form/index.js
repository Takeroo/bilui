import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import { Button, Form, Input } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import styles from './style.module.scss'
import { userService } from '../../../../../services/user'

@Form.create()
class PublishForm extends React.Component {

  state = {
    loading: false
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, user } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        this.setState({loading: true})
        const updatedUser = {...user, ...values };
        userService.updateUser(updatedUser).then(result => {
          this.setState({loading: false});
          this.props.updateInfo(result);
          this.props.toggleForm();
        })
      }
    })
  }

  render() {
    const { enabled, toggleForm, form, user, intl } = this.props
    const { tags, loading } = this.state;

    return (
      <div
        className={enabled ? `${styles.settings} ${styles.settingsOpened}` : styles.settings}
      >
        <Scrollbars style={{ height: '100vh' }}>
          <div className={styles.container}>
            <div className={styles.title}>
              <FormattedMessage id="author.profile.info.updateInfo" />
              <button
                className={`${styles.close} fa fa-times`}
                onClick={() => toggleForm()}
                type="button"
              />
            </div>
            <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>

              <div className="form-group">
                <Form.Item>
                  {form.getFieldDecorator('name', {
                    initialValue: user.name,
                    rules: [{ required: true, message: intl.formatMessage({id: 'author.profile.info.nameMessage'}) }],
                  })(
                    <Input placeholder={intl.formatMessage({id: 'author.profile.info.name'})} />,
                  )}
                </Form.Item>

                <Form.Item>
                  {form.getFieldDecorator('surname', {
                    initialValue: user.surname,
                    rules: [{ required: true, message: intl.formatMessage({id: 'author.profile.info.surnameMessage'}) }],
                  }, tags)(
                    <Input placeholder={intl.formatMessage({id: 'author.profile.info.surname'})} />,
                  )}
                </Form.Item>
              </div>
              <hr />

              <div className="form-group">
                <Form.Item>
                  {form.getFieldDecorator('mind', {
                    initialValue: user.mind
                  }, tags)(
                    <Input placeholder={intl.formatMessage({id: 'author.profile.info.mindMessage'})} />,
                  )}
                </Form.Item>
              </div>

              <div className="form-group">
                <Form.Item>
                  {form.getFieldDecorator('bio', {
                    initialValue: user.bio
                  }, tags)(
                    <Input.TextArea rows={4} placeholder={intl.formatMessage({id: 'author.profile.info.bioMessage'})} />,
                  )}
                </Form.Item>
              </div>

              <div className="form-actions" style={{textAlign: 'center'}}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  <FormattedMessage id="author.profile.info.update" />
                </Button>
              </div>
            </Form>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default injectIntl(PublishForm);
