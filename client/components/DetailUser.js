import React from 'react';
import appActions from './../actions';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Row, Col, Panel, Table, Thumbnail, Modal, Button } from 'react-bootstrap';
import moment from 'moment';

class DetailUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showModal: false
    };

    this.getUserInfo();
  }
  getUserInfo() {
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
  openModal() {
    this.setState({
      showModal: true
    });
  }
  closeModal() {
    this.setState({
      showModal: false
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  onDrop(files) {
    var req = request.post('/upload/' + this.props.params.id);
    files.forEach((file)=> {
      //if (file.type === 'image/jpg') {
      req.attach(file.name, file);
      //}
    });
    req.end((err, res) => {
      if (err){
        console.log(err);
      }
      if (res.body.success){
        // OK
        this.getUserInfo();
      } else {
        // ERROR
        this.openModal();
      }
    });
  }
  render() {
    let images = null;
    let html = null;
    if (this.state.user !== null){
      images = (<Row>
        {this.state.user.images.map((image, index) => {
          return (<Col xs={6} md={3}>
            <Thumbnail key={index} href="#" src={image.URL} />
          </Col>);
        })}
      </Row>);
      let day = moment(this.state.user.birthOfdate).format('YYYY-MM-DD');
      html = (<Panel>
        <Row>
          <Col sm={4} md={4} lg={4}>
            <h3>{this.state.user.name} {this.state.user.lastName}</h3>
            <Table striped>
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td>{this.state.user.email}</td>
                </tr>
                <tr>
                  <td>Fecha de Nacimiento:</td>
                  <td>{day}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col sm={8} md={8} lg={8}>
            <Dropzone className="dropZone" onDrop={this.onDrop.bind(this)}>
              <div>Intenta arrastrar archivos aquí o clickea para seleccionar archivos</div>
            </Dropzone>
            {images}
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Ocurrio un error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Falló la subida de uno o más archivos</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.closeModal.bind(this)}>OK</Button>
          </Modal.Footer>
        </Modal>
      </Panel>);
    } else {
      html = (<Panel>
        <Row>
        <h3>buscando ...</h3>
        </Row>
      </Panel>);
    }
    return html;
  }
}
module.exports = DetailUser;
