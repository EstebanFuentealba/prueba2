import React from 'react';
import Item from './Item';
import { Col, Table, Modal, Button } from 'react-bootstrap';
import appActions from './../actions';

class ListUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      showModal: false
    };
  }
  openModal(id) {
    this.setState({
      id: id,
      showModal: true
    });
  }
  closeModal() {
    this.setState({
      id: null,
      showModal: false
    });
  }
  confirmModal() {
    var me = this;
    appActions.deleteUser(this.state.id, (err, res) => {
      if (err) {
        res.status(500).json(err);
      }
      me.props.refresh();
      me.closeModal();
    });
  }
  render() {
    var me = this;
    return (<Col sm={12} md={8}>
        <Table responsive striped bordered condensed hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Fecha de Nacimiento</th>
              <th colSpan="3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user) => {
              return <Item key={user._id} user={user} openModal={this.openModal.bind(this)} />;
            })}
          </tbody>
        </Table>
        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>¿Eliminar fila?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Realmente quieres eliminar una fila?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>Cancelar</Button>
            <Button bsStyle="primary" onClick={this.confirmModal.bind(this)}>Confirmar</Button>
          </Modal.Footer>
        </Modal>
      </Col>);
  }
}
module.exports = ListUser;
