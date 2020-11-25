import React from 'react'
import { Button, Form, Input } from 'antd'
import { connect } from 'react-redux'
import Comment from './comment'
import styles from './style.module.scss'
import { commentService } from '../../../../services'

const FormItem = Form.Item
const { TextArea } = Input

@connect(({ user }) => ({ user }))
@Form.create()
class Comments extends React.Component {

  state = {
    comments:[],
    loading: false,
    loadLoading: false
  };

  componentDidMount() {
    this.loadComments();
  }

  loadComments = (pageNumber, size) =>{
    const { article } = this.props
    this.setState({loadLoading: true})
    commentService.getCommentsByArticle(article.id, pageNumber, size).then(page => {
      this.setState(prevState => ({comments: [...prevState.comments, ...page.content], page, loadLoading: false}));
    })
  }

  loadMore = () => {
    const { page } = this.state
    this.loadComments(page.number + 1);
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, article, user } = this.props
    form.validateFields((error, values) => {
      if (!error && article.id) {
        this.setState({loading: true})
        values.articleId = article.id
        values.user = user;
        commentService.saveComment(values).then(result => {
          this.setState(prevState => ({ comments: [...prevState.comments, result], loading: false }));
          form.resetFields();
        });
      }
    })
  }

  updateComment = (comment) => {
    return commentService.saveComment(comment).then(result => {
      const { comments } = this.state
      const index = comments.findIndex(function f(c) {return c.id === result.id;});
      comments[index] = {...comments[index], message: result.message, updatedAt: result.updatedAt}
      this.setState({ comments });
    });
  }

  deleteComment = (id) => {
    return commentService.deleteComment(id).then(() => {
      this.setState(prevState => ({ comments: [...prevState.comments.filter(x => x.id !== id)] }));
    });
  }

  render() {
    const { comments, page, loading, loadLoading } = this.state
    const { form, user } = this.props
    return (
      <>
        <div className="mb-4">
          <div className={styles.commentsTitle}>Comments</div>
          <div className={styles.addCommentForm}>
            <Form className="login-form" onSubmit={this.onSubmit}>
              <FormItem>
                {form.getFieldDecorator('message', {rules: [{ required: true }]})(<TextArea rows={2} placeholder="What are your thoughts?" />)}
              </FormItem>
              <FormItem className="text-right">
                <Button type="primary" htmlType="submit" loading={loading}>
                  <i className="fa fa-comment mr-2" />
                  Comment
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
        <div className="mb-4">
          <div className="mt-3">
            {comments.length > 0 && (
              <div>
                {comments.map(comment => (
                  <Comment user={user} comment={comment} updateComment={this.updateComment} deleteComment={this.deleteComment} />
                ))}
              </div>
            )}
            {page && page.totalPages > 1 && page.number + 1 < page.totalPages &&
              <div className="mb-5 pb-2">
                <Button className="btn btn-default btn-block mb-5" onClick={this.loadMore} loading={loadLoading}>
                  Load More
                </Button>
              </div>
            }
          </div>
        </div>
      </>
    )
  }
}

export default Comments
