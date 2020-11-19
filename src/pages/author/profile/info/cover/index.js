import React from 'react'
import { injectIntl } from 'react-intl'
import { Upload, message } from 'antd';
import {userService} from '../../../../../services/user'
import {config} from '../../../../../config'
import styles from './style.module.scss'

class Cover extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  beforeUpload = (file) => {
    const {intl} = this.props;
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error(intl.formatMessage({id: 'author.profile.info.fileFormatError'}));
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(intl.formatMessage({id: 'author.profile.info.fileSizeError'}));
    }
    return isJpgOrPng && isLt2M;
  }

  handleUpload = file => {
    this.setState({ loading: true });
    userService.uploadCover(file).then(result => {
      this.setState({loading: false});
      this.props.updateInfo(result);
    })
  };

  render() {
    const { enabled, user, intl } = this.props
    const { loading } = this.state;
    return (
      <div
        className={styles.head}
        style={{
          backgroundImage: user.cover ? `url('${config.apiUrl}/users/${user.id}/cover?cov=${user.cover}')` : `url('/resources/images/photos/4.jpeg')`,
        }}
      >
        {enabled &&
          <div className="pull-right">
            <Upload
              name="avatar"
              className={styles.avatarUploader}
              showUploadList={false}
              beforeUpload={this.beforeUpload}
              disabled={loading}
              multiple={false}
              customRequest={(e)=> this.handleUpload(e.file)}
            >
              <div className={`${styles.icon} btn btn-icon`}>
                <i className="fa fa-camera" />
              </div>
            </Upload>
          </div>
        }
        <div className="utils__title">
          <h2 className="text-white">
            {enabled && <strong>{user.mind || intl.formatMessage({id: 'author.profile.info.mind'})}</strong>}
            {!enabled && <strong>{user.mind}</strong>}
          </h2>
        </div>
      </div>
    );
  }
}

export default injectIntl(Cover)
