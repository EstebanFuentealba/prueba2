import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var day = moment(this.props.user.birthOfdate).format('YYYY-MM-DD');
    return (
      <tr key={this.props.user._id}>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.lastName}</td>
        <td>{this.props.user.email}</td>
        <td>{day}</td>
        <td><Link to={`/users/detail/${this.props.user._id}`} className="btn btn-default">Detalle</Link></td>
        <td><Link to={`/users/edit/${this.props.user._id}`} className="btn btn-default">Editar</Link></td>
        <td><a className="btn btn-danger" onClick={this.confirmDelete.bind(this)}>Eliminar</a></td>
      </tr>
    );
  }
  confirmDelete() {
    this.props.openModal(this.props.user._id);
  }
}
module.exports = Item;
