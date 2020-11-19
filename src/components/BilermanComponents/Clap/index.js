import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
// import style from './style.module.scss'


@connect(({ clap }) => ({ clap }))
class Clap extends React.Component {
  static defaultProps = {
    articleId: null
  }

  clap = (id) => {
    const { dispatch } = this.props
    if(id) {
      dispatch({
        type: 'clap/CLAP_ARTICLE',
        payload: { articleId: id},
      })
    }
  }

  render() {
    const { articleId, clap} = this.props
    const { clappedArticleIds } = clap;
    return (
      <Button type="link" onClick={() => this.clap(articleId)} shape="circle">
        { clappedArticleIds.includes(articleId) && <i className="fa fa-thumbs-up font-size-24" />}
        { !clappedArticleIds.includes(articleId) && <i className="fa fa-thumbs-o-up font-size-24" />}
      </Button>
    )
  }
}

export default Clap
