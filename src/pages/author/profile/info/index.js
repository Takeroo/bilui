import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import UpdateForm from './form'
import Cover from './cover'
import Avatar from './avatar'
import styles from './style.module.scss'

@connect(({ user }) => ({ user }))
class Info extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formStatus: false
    }
  }

  toggleForm = () => {
    this.setState((prevState) => ({formStatus: !prevState.formStatus}));
  }

  render() {
    const { user, author, updateUser} = this.props;
    const {formStatus} = this.state;
    return (
      <>
        <UpdateForm user={author} enabled={formStatus} toggleForm={this.toggleForm} updateInfo={updateUser} />
        <div className={styles.card}>
          <Cover user={author} enabled={author.id === user.id} updateInfo={updateUser} />
          <div>
            <div className={styles.left}>
              <Avatar user={author} size="110" borderColor="white" border enabled={author.id === user.id} updateInfo={updateUser} />
              <strong className="d-block">{`${author.name} ${author.surname}`}</strong>
              <span className="text-muted">{author.email}</span>
            </div>
            <div className={styles.right}>
              {author.id === user.id &&
                <div className="pull-right">
                  <Button type="default" onClick={() => this.toggleForm()}>
                    <i className='fa fa-pencil mr-2' />
                    Edit
                  </Button>
                </div>
              }
              {author.id === user.id &&  <p>{author.bio || `Your bio`}</p>}
              {!author.id === user.id && <p>{author.bio}</p>}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Info
