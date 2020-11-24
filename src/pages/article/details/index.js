import React from 'react'
import { Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import Avatar from 'components/BilermanComponents/Avatar'
import Comments from './comments'
import NotFoundPage from '../../404'
import { articleService } from '../../../services'
import { config } from '../../../config'
import styles from './style.module.scss'


class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    const id = query.get('id');
    let articleId;
    let redirect = false;
    if(!id) redirect = true;
    else articleId = id;

    this.state = {
      id: articleId,
      redirect,
      article: {},
      author: {}
    }
  }

  componentDidMount() {
    this.loadArticle();
  }

  loadArticle = () => {
    const { id } = this.state;
    articleService.getArticleById(id)
      .then(result => {
        this.setState({ article: result, author: result.user})
      })
      .catch(() => {
        this.setState({ redirect: true})
      })
  }

  render() {
    const { article, author, redirect } = this.state;
    if(redirect) return (<Route component={NotFoundPage} />)

    return (
      <div>
        <Helmet title="Details" />
        <div className="row">
          <div className="col-lg-2" />
          <div className="col-lg-8">
            <section className="card">
              <div className="card-header">
                <div className={styles.information}>
                  <div className={`${styles.title} mb-3`}>
                    <h1>
                      <a href="javascript: void(0);">{article.title}</a>
                    </h1>
                    <ul className={styles.meta}>
                      <li className={styles.metaInf}>
                        <span className={styles.articleAuthor}>{ article.subtitle }</span>
                      </li>
                    </ul>
                  </div>
                  <div className="clearfix">
                    <div className={`${styles.commentAvatar} mr-2`}>
                      <Avatar author={author} size="50" border={false} />
                    </div>
                    <div className="pull-left">
                      <a href={`/#/author/profile?id=${author.id}`}><strong>{`${author.name} ${author.surname}`}</strong></a>
                      <br />
                      <small className="text-muted">{moment(article.createdAt).fromNow()}</small>
                    </div>
                    <div className="pull-right">
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
                </div>
                {article.imageId &&
                  <div className="article-media">
                    <img src={`${config.apiUrl}/images/${article.imageId}`} alt={article.title} />
                  </div>
                }
              </div>
              <div className="card-body">
                <div className={styles.blogFeed}>
                  <article className={styles.article}>
                    <div
                      className={styles.content}
                      dangerouslySetInnerHTML={{ __html: article.body }}
                    />
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

                  <div className={`${styles.authorCard} clearfix`}>
                    <div className={styles.authorPhoto}>
                      <Avatar author={author} size="110" />
                    </div>
                    <div className={styles.authorInf}>
                      <a href={`/#/author/profile?id=${author.id}`}>
                        <span className={styles.authorName}>{`${author.name} ${author.surname}`}</span>
                      </a>
                      <p className={styles.authorWords}>&ldquo;{author.bio}&rdquo;</p>
                    </div>
                  </div>

                  { article && article.id && <Comments article={article} /> }
                </div>
              </div>
            </section>
          </div>
          <div className="col-lg-2" />
        </div>
      </div>
    )
  }
}

export default BlogPost
