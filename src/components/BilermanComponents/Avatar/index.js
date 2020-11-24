import React from 'react'
import style from './style.module.scss'
import { config } from '../../../config'

class Avatar extends React.Component {
  static defaultProps = {
    size: false,
    border: false,
    borderColor: '#d2d9e5'
  }

  render() {
    const { author, size, borderColor, border } = this.props
    return (
      <>
        {author && (
          <a
            className={`${style.avatar} ${size ? style[`size${size}`] : ''} ${
              border ? style.border : ''
            }`}
            href={`/#/author/profile?id=${author.id}`}
            style={{
              borderColor,
            }}
          >
            {author.avatar && <img src={`${config.apiUrl}/users/${author.id}/avatar`} alt={author.name} onError={(e)=>{e.target.onerror = null; e.target.src="/resources/images/avatar.jpg"}} />}
            {!author.avatar && <img src='/resources/images/avatar.jpg' alt={author.name} />}
          </a>
        )}
      </>
    )
  }
}

export default Avatar
