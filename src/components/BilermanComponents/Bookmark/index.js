import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
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
      })
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
