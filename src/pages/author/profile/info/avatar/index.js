import React from 'react'
import { injectIntl } from 'react-intl'
import { Upload, message } from 'antd';
import {userService} from '../../../../../services/user'
import {config} from '../../../../../config'
import style from './style.module.scss'

class Avatar extends React.Component {

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
    userService.uploadAvatar(file).then(result => {
      this.setState({loading: false});
      this.props.updateInfo(result);
    })
  };

  render() {
    const { loading } = this.state;
    const { user, size, borderColor, border, enabled } = this.props
    return (
      <div
        className={`${style.avatarContainer} ${size ? style[`size${size}`] : ''} ${
          border ? style.border : ''
        }`}
        style={{
          borderColor,
        }}
      >
        {user.avatar && <img className={style.avatarImage} src={`${config.apiUrl}/users/${user.id}/avatar?av=${user.avatar}`} alt="User" /> }
        {!user.avatar && <img className={style.avatarImage} src="/resources/images/avatar.jpg" alt="User" /> }

        {enabled &&
          <div className={style.avatarOverlay}>
            <Upload
              name="avatar"
              className={style.avatarUploader}
              showUploadList={false}
              beforeUpload={this.beforeUpload}
              disabled={loading}
              multiple={false}
              customRequest={(e)=> this.handleUpload(e.file)}
            >
              <div className={style.icon}>
                <i className="fa fa-camera" />
              </div>
            </Upload>
          </div>
        }
      </div>
    );
  }
}

export default injectIntl(Avatar)
