import React from 'react'
import { Button, Pagination } from 'antd'
import { Helmet } from 'react-helmet'
import styles from './style.module.scss'
import data from './data.json'

class BlogFeed extends React.Component {
  state = {
    articlesData: data.articlesData
  }

  render() {
    const { articlesData } = this.state
    return (
      <div>
        <Helmet title="Blog Feed" />
        <section className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Latest Posts</strong>
            </div>
          </div>
          <div className="card-body">
            <div className={styles.blogFeed}>
              <div className="row">
                <div className="col-lg-12">
                  <main>
                    {articlesData.map(article => (
                      <article className={styles.article} key={article.author}>
                        <div className={styles.information}>
                          <div className={styles.title}>
                            <h1>
                              <a href="javascript: void(0);">{article.name}</a>
                            </h1>
                          </div>
                          <ul className={styles.meta}>
                            <li className={styles.metaInf}>
                              <span>
                                Post By <a href="javascript: void(0);">{article.author}</a>
                              </span>
                            </li>
                            <li className={styles.metaInf}>
                              <span className={styles.articleDate}>{`On ${article.date}`}</span>
                            </li>
                          </ul>
                        </div>
                        <div className={styles.articleMedia}>
                          <a href="javascript: void(0);" className={styles.link}>
                            <img src={`/${article.cover}`} alt={article.name} />
                          </a>
                        </div>
                        <div className={styles.content}>
                          <div dangerouslySetInnerHTML={{ __html: article.shortContent }} />
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
                                {article.tags.map(tag => (
                                  <a href="javascript: void(0);" key={tag}>
                                    {tag}
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
                  <div className="mb-5">
                    <Pagination defaultCurrent={1} total={50} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default BlogFeed