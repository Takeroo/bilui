import React from 'react';
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
    const { enabled, toggleForm, form, user } = this.props
    const { tags, loading } = this.state;

    return (
      <div
        className={enabled ? `${styles.settings} ${styles.settingsOpened}` : styles.settings}
      >
        <Scrollbars style={{ height: '100vh' }}>
          <div className={styles.container}>
            <div className={styles.title}>
              Update your info
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
                    rules: [{ required: true, message: 'Provide your name' }],
                  })(
                    <Input placeholder="Name" />,
                  )}
                </Form.Item>

                <Form.Item>
                  {form.getFieldDecorator('surname', {
                    initialValue: user.surname,
                    rules: [{ required: true, message: 'Provide your surname' }],
                  }, tags)(
                    <Input placeholder="Surname" />,
                  )}
                </Form.Item>
              </div>
              <hr />

              <div className="form-group">
                <Form.Item>
                  {form.getFieldDecorator('mind', {
                    initialValue: user.mind
                  }, tags)(
                    <Input placeholder="What is on your mind?" />,
                  )}
                </Form.Item>
              </div>

              <div className="form-group">
                <Form.Item>
                  {form.getFieldDecorator('bio', {
                    initialValue: user.bio
                  }, tags)(
                    <Input.TextArea rows={4} placeholder="Tell us about yourself.." />,
                  )}
                </Form.Item>
              </div>

              <div className="form-actions" style={{textAlign: 'center'}}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Publish
                </Button>
              </div>
            </Form>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default PublishForm;
