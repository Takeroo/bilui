import React from 'react'
import { Icon, Dropdown, Menu, Form, Input, Button } from 'antd'
import moment from 'moment'
import Avatar from 'components/BilermanComponents/Avatar'
import styles from '../../style.module.scss'

const FormItem = Form.Item

@Form.create()
class Reply extends React.Component {

  state = {
    editReply: false,
    loading: false
  };

  toggleEditReply = () => {
    this.setState((prevState) => ({editReply: !prevState.editReply}));
  }

  delete = () => {
    const { deleteReply, reply } = this.props
    deleteReply(reply.id);
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, reply, updateReply } = this.props
    form.validateFields((error, values) => {
      if (!error && reply.id) {
        this.setState({loading: true})
        values.id = reply.id
        values.commentId = reply.commentId
        updateReply(values).then(() => {
          this.setState({loading: false, editReply: false});
        });
      }
    })
  }

  render() {
    const { reply, user, form } = this.props
    const { editReply, loading } = this.state
    return (
      <div
        className={`${styles.commentItem} clearfix`}
        key={`reply_${reply.id}`}
      >
        <div className={styles.commentAvatar}>
          <Avatar author={reply.user} size="40" />
        </div>
        <div className={styles.commentContent}>
          <div className="clearfix">
            <div className="pull-left">
              <strong>{reply.user.name}</strong> {reply.user.surname}:
              <br />
              <small className="text-muted">
                {moment(new Date(reply.updatedAt)).fromNow()}
              </small>
            </div>
            {user && user.id === reply.user.id &&
              <div className="pull-right">
                <Dropdown overlay={
                  <Menu>
                    <Menu.Item onClick={this.toggleEditReply}>
                      <Icon type="edit" /> Edit
                    </Menu.Item>
                    <Menu.Item onClick={this.delete}>
                      <Icon type="delete" /> Delete
                    </Menu.Item>
                  </Menu>}
                >
                  <a
                    className="ant-dropdown-link"
                    href="javascript: void(0);"
                  >
                    Actions <Icon type="down" />
                  </a>
                </Dropdown>
              </div>
            }
          </div>
          {!editReply && <p> {reply.message} </p> }
          {editReply &&
          <div className={styles.addCommentForm}>
            <Form className="login-form" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-md-7">
                  <FormItem>
                    {form.getFieldDecorator('message', {
                      initialValue: reply.message,
                      rules: [{ required: true }],
                    })
                    (<Input size="default" />)}
                  </FormItem>
                </div>
                <div className="col-md-5">
                  <FormItem>
                    <div className="text-right">
                      <Button className="mr-2" type="primary" htmlType="submit" loading={loading}>
                        <Icon type="edit" /> Edit
                      </Button>
                      <Button type="default" onClick={this.toggleEditReply}>Cancel</Button>
                    </div>
                  </FormItem>
                </div>
              </div>
            </Form>
          </div>
          }
          <div>
            <a href="javascript: void(0);" className="mr-3">
              <i className="icmn-heart mr-2" />
              {reply.likesCount > 0 && (
                <span>{`${reply.likesCount} Likes`}</span>
              )}
              {reply.likesCount === 0 && (
                <span>{`${reply.likesCount} Like`}</span>
              )}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Reply
