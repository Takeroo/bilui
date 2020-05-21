import React from 'react'
import { Pagination } from 'antd'
import Post from './post'
import { articleService } from '../../../../services'

class Feed extends React.Component {

  state = {
    articles:[],
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = (pageNumber, size, title) =>{
    articleService.getArticles(pageNumber, size, title).then(page => {
      this.setState({articles: page.content, page});
    })
  }

  onPageChanged = (pageNumber, pageSize) => {
    this.loadArticles(pageNumber - 1, pageSize);
  }

  render() {
    const { articles, page } = this.state
    return (
      <div>

        <div className="row">
          <div className="col-lg-12">
            <div className="utils__title mb-3">
              <strong>Latest Posts</strong>
            </div>
          </div>
        </div>

        {articles.map(article => (
          <Post article={article} author={article.user} />
        ))}

        <div className="row">
          <div className="col-lg-12">
            {page && page.totalPages > 1 &&
            <div className="mb-5">
              <Pagination defaultCurrent={1} current={page.number + 1} total={page.totalElements} pageSize={10} onChange={this.onPageChanged} />
            </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Feed
