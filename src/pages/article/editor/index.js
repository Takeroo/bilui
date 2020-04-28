import React from 'react';
import { Helmet } from 'react-helmet'
import ReactQuill from 'react-quill-2'
import classNames from 'classnames'
import { BackTop, Layout } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './style.module.scss'

import {draftService } from '../../../services'
import TopBar from './navbar'
import PublishForm from './form'

const mapStateToProps = ({ settings }) => ({
  isBorderless: settings.isBorderless,
  isSquaredBorders: settings.isSquaredBorders,
  isFixedWidth: settings.isFixedWidth,
  isMenuShadow: settings.isMenuShadow,
  isMenuTop: settings.isMenuTop,
})

@withRouter
@connect(mapStateToProps)
class Editor extends React.Component {

  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    const id = query.get('id');

    this.state = {
      id,
      formStatus: false,
      draft: { body: '' }
    };
  }

  componentDidMount() {
    this.getArticle();
    this.initTitleListener();
    this.startInterval();
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  getSubtitle = (body) => {
    let result = '';
    const div = document.createElement('div');
    div.innerHTML = body.trim();
    const htmlBody = div.firstChild;
    if(htmlBody){
      result = htmlBody.firstChild.textContent;
    }
    if(result.length < 150) return result;
    result = result.substr(0, 150);
    const dots = '...';
    return result.substring(0, result.lastIndexOf(' ')) + dots;
  }

  getArticle = () => {
    const { id } = this.state;
    if (id) {
      draftService.getDraftById(id).then(data => {
        this.setState({ draft: data, initialTitle: data.title  });
        this.setState({ changed: false  });
      });
    }
  }

  initTitleListener = () => {
    const title = document.getElementById('editor-title');
    title.addEventListener(
      'input',
      () => {
        this.handleTitleChange(title.innerHTML);
      },
      false,
    );
  }

  startInterval = () => {
    const saveInterval = setInterval(() => {
      this.updateDraft();
    }, 5000);
    this.setState({saveInterval});
  }

  clearInterval = () => {
    const {saveInterval} = this.state;
    clearInterval(saveInterval);
    this.updateDraft();
  }

  handleImageChange = (imageId) =>{
    const { draft } = this.state;
    draft.imageId = imageId;
    this.setState({ draft, changed: true, syncStatus:'' });
    this.updateDraft();
  }

  toggleForm = () => {
    this.setState((prevState) => ({formStatus: !prevState.formStatus}));
  }

  handleChange = (e) => {
    const { draft } = this.state;
    const subtitle = this.getSubtitle(e);
    draft.body = e;
    draft.subtitle = subtitle;
    this.setState({ draft, changed: true, syncStatus:'' });
  }

  handleTitleChange = (e) => {
    const { draft } = this.state;
    draft.title = e;
    this.setState({ draft, changed: true, syncStatus:'' });
  }

  updateDraft = () => {
    const { changed, draft } = this.state;
    if (!changed) return;
    this.setState({ changed: false, syncStatus:'Syncing..' });

    if (draft.title || draft.body) {
      draftService.saveDraft(draft).then(data => {
        this.setState({ draft: data, syncStatus:'Saved' });
      });
    }
  }

  render() {
    const { id, draft, initialTitle, formStatus, syncStatus } = this.state;
    const { body } = draft;
    const {
      isBorderless,
      isSquaredBorders,
      isFixedWidth,
      isMenuShadow,
      isMenuTop,
    } = this.props

    return (
      <Layout
        className={classNames({
          settings__borderLess: isBorderless,
          settings__squaredBorders: isSquaredBorders,
          settings__fixedWidth: isFixedWidth,
          settings__menuShadow: isMenuShadow,
          settings__menuTop: isMenuTop,
        })}
      >
        <BackTop />
        <PublishForm enabled={formStatus} toggleForm={this.toggleForm} draft={draft} handleImage={this.handleImageChange} />
        <Layout>
          <Layout.Header>
            <TopBar toggleForm={this.toggleForm} syncStatus={syncStatus} />
          </Layout.Header>
          <Layout.Content style={{ height: '100%', position: 'relative', background: 'white' }}>
            <div className="utils__content">
              <div>
                <Helmet title="Add Blog Post" />
                <div className={styles.block}>
                  <section>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card-body">
                          <div style={{textAlign:'center'}} className={styles.addPost}>
                            {id && (
                              <h2 id='editor-title' contentEditable placeholder="Your title.." style={{ color: '#525f7f' }}>
                                {initialTitle}
                              </h2>
                            )}
                            {!id && (
                              <h2 id='editor-title' contentEditable placeholder="Your title.." style={{ color: '#525f7f' }}>
                                {}
                              </h2>
                            )}
                            <ReactQuill
                              theme="bubble"
                              onChange={this.handleChange}
                              value={body}
                              modules={Editor.modules}
                              formats={Editor.formats}
                              placeholder='TELL YOUR STORY..'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

/*
 * PropType validation
//  */
// Editor.propTypes = {
//   placeholder: PropTypes.string,
// };

export default Editor;
