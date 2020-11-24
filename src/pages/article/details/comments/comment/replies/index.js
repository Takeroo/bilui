import React from 'react'
import { Button, Form, Input } from 'antd'
import { connect } from 'react-redux'
import {commentService} from '../../../../../../services'
import Reply from './reply'
import styles from '../../../style.module.scss'

const FormItem = Form.Item

@connect(({ user }) => ({ user }))
@Form.create()
class Replies extends React.Component {

  state = {
    replies:[],
    loading: false,
    loadLoading: false
  };

  componentDidMount() {
    this.loadReplies();
  }

  loadReplies = (pageNumber, size) =>{
    const { comment } = this.props
    this.setState({loadLoading: true})
    commentService.getRepliesByComment(comment.id, pageNumber, size).then(page => {
      this.setState(prevState => ({replies: [...prevState.replies, ...page.content], page, loadLoading: false}));
    })
  }

  loadMore = () => {
    const { page } = this.state
    this.loadReplies(page.number + 1);
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, comment, user } = this.props
    form.validateFields((error, values) => {
      if (!error && comment.id) {
        this.setState({loading: true})
        values.commentId = comment.id
        values.user = user;
        commentService.saveReply(values).then(result => {
          this.setState(prevState => ({ replies: [...prevState.replies, result], loading: false }));
          form.resetFields();
        });
      }
    })
  }

  updateReply = (reply) => {
    return commentService.saveReply(reply).then(result => {
      const { replies } = this.state
      const index = replies.findIndex(function(c) {return c.id === result.id;});
      replies[index] = {...replies[index], message: result.message, updatedAt: result.updatedAt}
      this.setState({ replies });
    });
  }

  deleteReply = (id) => {
    return commentService.deleteReply(id).then(() => {
      this.setState(prevState => ({ replies: [...prevState.replies.filter(x => x.id !== id)] }));
    });
  }

  render() {
    const { replies, page, loading, loadLoading } = this.state
    const { form, user } = this.props
    return (
      <>
        <div className={styles.subcommentsContent}>
          {replies.map(reply => (
            <Reply user={user} reply={reply} updateReply={this.updateReply} deleteReply={this.deleteReply} />
          ))}
          {page && page.totalPages > 1 && page.number + 1 < page.totalPages &&
            <div className="mb-5 pb-2">
              <Button className="btn btn-default btn-block mb-5" onClick={this.loadMore} loading={loadLoading}>
                Load More
              </Button>
            </div>
          }
        </div>
        <div className={styles.addCommentForm}>
          <Form className="login-form" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-9">
                <FormItem>
                  {form.getFieldDecorator('message', {rules: [{ required: true }]})(
                    <Input placeholder="type your reply" />,
                  )}
                </FormItem>
              </div>
              <div className="col-md-3">
                <FormItem>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    <i className="fa fa-comment mr-2" />
                    Reply
                  </Button>
                </FormItem>
              </div>
            </div>
          </Form>
        </div>
      </>
    )
  }
}

export default Replies
