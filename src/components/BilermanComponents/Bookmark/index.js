import React from 'react'
import { connect } from 'react-redux'
import { Button, message } from 'antd'
// import style from './style.module.scss'


@connect(({ bookmark }) => ({ bookmark }))
class Bookmark extends React.Component {
  static defaultProps = {
    articleId: null
  }

  save = (id) => {
    const { dispatch } = this.props
    if(id) {
      dispatch({
        type: 'bookmark/BOOKMARK_ARTICLE',
        payload: { articleId: id},
        callback: this.updateBookmark
      })
    }
  }

  updateBookmark = () => {
    const {articleId, bookmark} = this.props
    const { savedArticleIds} = bookmark;
    if(savedArticleIds.includes(articleId)) {
      message.success({
        content: 'Saved',
        icon: <i className="fa fa-bookmark mr-2" />,
        duration: 0.1
      });
    }
    else {
      message.success({
        content: 'Unsaved',
        icon: <i className="fa fa-bookmark-o mr-2" />,
        duration: 0.1
      });
    }
  }

  render() {
    const { articleId, bookmark} = this.props
    const { savedArticleIds} = bookmark;
    return (
      <Button type="link" onClick={() => this.save(articleId)} shape="circle">
        { savedArticleIds.includes(articleId) && <i className="fa fa-bookmark font-size-20" />}
        { !savedArticleIds.includes(articleId) && <i className="fa fa-bookmark-o font-size-20" />}
      </Button>
    )
  }
}

export default Bookmark
