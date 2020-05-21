import React, { Component } from 'react'
import { Button, Pagination } from 'antd'
import { articleService } from '../../../../services'
import { config } from '../../../../config'
import styles from './style.module.scss'

class Latest extends Component {

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
    const { articles, page } = this.state;
    return (
      <div className={styles.block}>
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Latest</strong>
            </div>
          </div>
          <div className="card-body">
            <div className={styles.blogFeed}>
              <div className="row">
                <div className="col-lg-12">
                  <main>
                    {articles.map(article => (
                      <article className={styles.article} key={article.createdBy}>
                        <div className={styles.information}>
                          <div className={styles.title}>
                            <h1>
                              <a href="javascript: void(0);">{article.title}</a>
                            </h1>
                          </div>
                          <ul className={styles.meta}>
                            <li className={styles.metaInf}>
                              <span>
                                Post By <a href="javascript: void(0);">{article.createdBy}</a>
                              </span>
                            </li>
                            <li className={styles.metaInf}>
                              <span className={styles.articleDate}>{`On ${article.createdAt}`}</span>
                            </li>
                          </ul>
                        </div>
                        {article.imageId &&
                          <div className={styles.articleMedia}>
                            <a href="javascript: void(0);" className={styles.link}>
                              <img src={`${config.apiUrl}/images/${article.imageId}`} alt={article.title} />
                            </a>
                          </div>
                        }
                        <div className={styles.content}>
                          <div dangerouslySetInnerHTML={{ __html: article.subtitle }} />
                          <div className={styles.articleMore}>
                            <Button type="primary">
                              Read more
                              <i className="ml-2 fa fa-angle-right" aria-hidden="true" />
                            </Button>
                          </div>
                        </div>
                        <footer className={styles.footer}>
                          <div className="row">
                            <div className="col-8">
                              <div className={styles.hashtags}>
                                {article.tags && article.tags.map(tag => (
                                  <a href="javascript: void(0);" key={tag.id}>
                                    {tag.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                            <div className="col-4">
                              <ul className={styles.share}>
                                <li className={styles.shareItem}>
                                  <a href="javascript: void(0);">
                                    <i className="fa fa-facebook" />
                                  </a>
                                </li>
                                <li className={styles.shareItem}>
                                  <a href="javascript: void(0);">
                                    <i className="fa fa-twitter" />
                                  </a>
                                </li>
                                <li className={styles.shareItem}>
                                  <a href="javascript: void(0);">
                                    <i className="fa fa-pinterest-p" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </footer>
                      </article>
                    ))}
                  </main>
                  {page && page.totalPages > 1 &&
                    <div className="mb-5">
                      <Pagination defaultCurrent={1} current={page.number + 1} total={page.totalElements} pageSize={10} onChange={this.onPageChanged} />
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Latest
