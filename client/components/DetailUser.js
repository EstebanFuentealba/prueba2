import React from 'react';
import appActions from './../actions';
import Dropzone from 'react-dropzone';
import request from 'superagent';

class DetailUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    var me = this;
    appActions.getUser(this.props.params.id, (err, res) => {
      if (err) {
        res.status(500).json(err);
      }
      me.setState({
        user: res.body
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  onDrop(files) {
    console.log('drops');
    console.log(files);
    var req = request.post('/upload/' + this.props.params.id);
    files.forEach((file)=> {
      if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png') {
        req.attach(file.name, file);
      }
    });
    req.end(function(err, res) {
      if (err){
        console.log(err);
      }
      console.log(res.body);
    });
  }
  render() {
    let images = null;
    let html = null;
    if (this.state.user !== null){
      images = (<ul className="small-block-grid-3">
        {this.state.user.images.map((image) => {
          console.log(image);
          return (<li>
            <img className="th" src={image.URL} />
          </li>);
        })}
      </ul>);
      html = (<div className="small-12 columns">
        <h1>Detalle </h1>
        <div className="small-4 columns">
          <div className="small-4">
            <h2>{this.state.user.name} {this.state.user.lastName}</h2>
          </div>
          <div className="small-4">
            <h2>{this.state.user.email}</h2>
          </div>
          <div className="small-4">
            <h2>{this.state.user.birthOfdate}</h2>
          </div>
          <div className="small-12 columns">
            {images}
          </div>
          <div className="small-12 columns">
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
        </div>
      </div>);
    } else {
      html = (<div className="small-12 columns">
        <h1>buscando ...</h1>
      </div>);
    }
    return html;
  }
}
module.exports = DetailUser;
