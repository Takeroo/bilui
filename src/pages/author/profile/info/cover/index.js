import React from 'react'
import { Upload, message } from 'antd';
import {userService} from '../../../../../services/user'
import {config} from '../../../../../config'
import styles from './style.module.scss'

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Cover extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleUpload = file => {
    this.setState({ loading: true });
    userService.uploadCover(file).then(result => {
      this.setState({loading: false});
      this.props.updateInfo(result);
    })
  };

  render() {
    const { enabled, user } = this.props
    const { loading } = this.state;
    return (
      <div
        className={styles.head}
        style={{
          backgroundImage: user.cover ? `url('${config.apiUrl}/users/${user.id}/cover?cov=${user.cover}')` : `url('/resources/images/photos/6.jpeg')`,
        }}
      >
        {enabled &&
          <div className="pull-right">
            <Upload
              name="avatar"
              className={styles.avatarUploader}
              showUploadList={false}
              beforeUpload={beforeUpload}
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
            {enabled && <strong>{user.mind || `Your awesome mind`}</strong>}
            {!enabled && <strong>{user.mind}</strong>}
          </h2>
        </div>
      </div>
    );
  }
}

export default Cover
