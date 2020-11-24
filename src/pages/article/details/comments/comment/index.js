import React from 'react'
import { Icon, Dropdown, Menu, Form, Input, Button } from 'antd'
import moment from 'moment'
import Avatar from 'components/BilermanComponents/Avatar'
import Replies from './replies'
import styles from './style.module.scss'

const FormItem = Form.Item

@Form.create()
class Comment extends React.Component {

  state = {
    showReplies: false,
    editComment: false,
    loading: false
  };

  toggleEditComment = () => {
    this.setState((prevState) => ({editComment: !prevState.editComment}));
  }

  toggleRepliesView = () => {
    this.setState((prevState) => ({showReplies: !prevState.showReplies}));
  }

  delete = () => {
    const { deleteComment, comment } = this.props
    deleteComment(comment.id);
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, comment, updateComment } = this.props
    form.validateFields((error, values) => {
      if (!error && comment.id) {
        this.setState({loading: true})
        values.id = comment.id
        values.articleId = comment.articleId
        updateComment(values).then(() => {
          this.setState({loading: false, editComment: false});
        });
      }
    })
  }

  render() {
    const { comment, user, form } = this.props
    const { showReplies, editComment, loading } = this.state
    return (
      <>
        <div
          className={`clearfix ${styles.commentItem} ${
            comment.subComments !== undefined ? 'pb-0' : ''
          }`}
          key={`comment_${comment.id}`}
        >
          <div className={styles.commentAvatar}>
            <Avatar author={comment.user} size="50" />
          </div>
          <div className={styles.commentContent}>
            <div className="clearfix">
              <div className="pull-left">
                <strong>{comment.user.name}</strong> {comment.user.surname}:
                <br />
                <small className="text-muted"> updated {moment(new Date(comment.updatedAt)).fromNow()}</small>
              </div>
              {user && user.id === comment.user.id &&
                <div className="pull-right">
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item onClick={this.toggleEditComment}>
                          <Icon type="edit" /> Edit
                        </Menu.Item>
                        <Menu.Item onClick={this.delete}>
                          <Icon type="delete" /> Delete
                        </Menu.Item>
                      </Menu>}
                  >
                    <a className="ant-dropdown-link" href="javascript: void(0);">
                      Actions <Icon type="down" />
                    </a>
                  </Dropdown>
                </div>
              }
            </div>
            {!editComment && <p> {comment.message} </p> }
            {editComment &&
              <div className={styles.addCommentForm}>
                <Form className="login-form" onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-md-7">
                      <FormItem>
                        {form.getFieldDecorator('message', {
                          initialValue: comment.message,
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
                          <Button type="default" onClick={this.toggleEditComment}>Cancel</Button>
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
                {comment.likesCount > 0 && (
                  <span>{`${comment.likesCount} Likes`}</span>
                )}
                {comment.likesCount === 0 && (
                  <span>{`${comment.likesCount} Like`}</span>
                )}
              </a>
              <a href="javascript: void(0);" className="mr-3" onClick={this.toggleRepliesView}>
                <i className="icmn-bubble mr-2" />
                {comment.repliesCount > 1 && (
                  <span>{`${comment.repliesCount} Replies`}</span>
                )}
                {comment.repliesCount === 0 && (
                  <span>{`${comment.repliesCount} Reply`}</span>
                )}
              </a>
              <a href="javascript: void(0);" onClick={this.toggleRepliesView}>
                <i className="icmn-reply mr-2" />
                <span>Reply</span>
              </a>
            </div>
            {showReplies && <Replies comment={comment} /> }
          </div>
        </div>
      </>
    )
  }
}

export default Comment
