import React from 'react'
import { Pagination } from 'antd'
import Post from './post'
import { articleService } from '../../../services'

class Feed extends React.Component {

  state = {
    articles: false
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = (pageNumber, size) =>{
    const { tagName } = this.props;
    articleService.getArticlesByTagName(tagName, pageNumber, size).then(page => {
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
        {articles && articles.length > 0 && articles.map(article => (
          <Post article={article} author={article.user} key={`article_${article.id}`} />
        ))}

        {articles && articles.length === 0 && <h5 className="mb-3 text-black"> No related articles </h5>}

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
