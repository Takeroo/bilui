import React, { Component } from 'react'
import { Dropdown, Icon, Menu, Pagination, Modal } from 'antd'
import { draftService } from '../../../../services'
import style from '../style.module.scss'

const { confirm } = Modal;

class PagedDrafts extends Component {

  state = {
    drafts:[],
  };

  componentDidMount() {
    this.loadDrafts();
  }

  loadDrafts = (pageNumber, size) =>{
    const { user, published } = this.props;
    draftService.getUserDrafts(user.id, published, pageNumber, size).then(page => {
      this.setState({drafts: page.content, page});
    })
  }

  handleDelete = (draft) => {
    confirm({
      title: 'Are you sure to delete article?',
      icon: <Icon type="delete" />,
      content: (
        <div>
          <div className="utils__title">
            <strong>{draft.title}</strong>
          </div>
          <div className="utils__titleDescription">
            {draft.subtitle}
          </div>
        </div>
      ),
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk : () => this.deleteDraft(draft.id)
    });
  }

  deleteDraft = (id) => {
    draftService.deleteDraft(id)
      .then(() => {
        this.loadDrafts();
      })
  }

  onPageChanged = (pageNumber, pageSize) => {
    this.loadDrafts(pageNumber - 1, pageSize);
  }


  render() {
    const { drafts, page } = this.state;
    return (
      <>
        {drafts.map(draft => (
          <div key={draft.name}>
            <div className={`${style.wallItem} clearfix`}>
              <div className="mb-3">
                <div className="pull-right">
                  <Dropdown overlay={
                    <Menu>
                      <Menu.Item>
                        <a href={`/article/edit?id=${draft.id}`}>
                          <Icon type="edit" /> Edit
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a href="javascript: void(0);" onClick={() => this.handleDelete(draft)}>
                          <Icon type="delete" /> Delete
                        </a>
                      </Menu.Item>
                    </Menu>
                  }
                  >
                    <a className="ant-dropdown-link" href="javascript: void(0);">
                      Actions <Icon type="down" />
                    </a>
                  </Dropdown>
                </div>
              </div>
              <div>
                <div className="utils__title">
                  {draft.title && <strong>{draft.title}</strong>}
                  {!draft.title && <strong> Untitled draft </strong>}
                </div>
                <div className="utils__titleDescription">
                  {draft.subtitle}
                </div>
              </div>
            </div>
          </div>
        ))}

        {page && page.totalPages > 1 &&
        <div className="mb-2">
          <Pagination defaultCurrent={1} current={page.number + 1} total={page.totalElements} pageSize={10} onChange={this.onPageChanged} />
        </div>
        }
      </>
    )
  }
}

export default PagedDrafts
