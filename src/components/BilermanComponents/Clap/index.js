import React from 'react'
import { connect } from 'react-redux'
import { Button, message } from 'antd'
// import style from './style.module.scss'


@connect(({ clap }) => ({ clap }))
class Clap extends React.Component {

  state  = {
    clapCount: this.props.article.claps
  }

  clap = (id) => {
    const { dispatch } = this.props
    if(id) {
      dispatch({
        type: 'clap/CLAP_ARTICLE',
        payload: { articleId: id},
        callback: this.updateClaps
      })
    }
  }

  updateClaps = () => {
    this.setState((prevState) => ({clapCount: prevState.clapCount + 1}));
    message.success({
      content: '+ 1',
      icon: <i className="fa fa-thumbs-up mr-1" />,
      duration: 0.1
    });
  }

  render() {
    const { article, clap} = this.props
    const { clapCount } = this.state
    const { clappedArticleIds } = clap;

    if( article && article.id)
      return (
        <>
          <Button type="link" onClick={() => this.clap(article.id)} shape="circle">
            { clappedArticleIds.includes(article.id) && <i className="fa fa-thumbs-up font-size-24" />}
            { !clappedArticleIds.includes(article.id) && <i className="fa fa-thumbs-o-up font-size-24" />}
          </Button>
          {clapCount}
        </>
      )
    return (<></>)
  }
}

export default Clap
