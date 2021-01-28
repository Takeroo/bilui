import React from 'react'
import { tagService } from '../../../services'

class Info extends React.Component {

  state = {
    familiarTags:[],
  };

  componentDidMount() {
    this.loadRelatedTags(5);
  }

  loadRelatedTags = (size) =>{
    const { tagName } = this.props
    tagService.getFamiliarTags(tagName, size).then(result => {
      this.setState({familiarTags: result});
    })
  }

  render() {
    const { tagName } = this.props
    const { familiarTags } = this.state
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="mb-3 text-black">
            Tagged in: <strong style={{textTransform: "uppercase"}}>{tagName}</strong>
          </h5>
          <hr />
          <dl className="row">
            <dt className="col-xl-12">Related tags:</dt>
            <dd className="col-xl-12">
              {familiarTags.map(tag => (
                <a href={`/#/tag?name=${tag.name}`} key={tag.id}>
                  <span className="badge badge-default mr-1" key={tag.id}>{tag.name}</span>
                </a>
              ))}
            </dd>
          </dl>
        </div>
      </div>
    )
  }
}

export default Info
