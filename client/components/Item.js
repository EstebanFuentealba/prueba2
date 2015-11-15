import React from 'react';
import {Link} from 'react-router';
import appActions from './../actions';
import moment from 'moment';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var detalleURL = 'detalle/' + this.props.user._id;
    var editarURL = 'editar/' + this.props.user._id;
    var day = moment(this.props.user.birthOfdate).format('YYYY-MM-DD');
    return (
      <tr key={this.props.user._id}>
        <td>{this.props.user.name}</td>
        <td>{this.props.user.lastName}</td>
        <td>{this.props.user.email}</td>
        <td>{day}</td>
        <td><Link to={detalleURL}>Detalle</Link></td>
        <td><Link to={editarURL}>Editar</Link></td>
        <td><a onClick={this.confirmDelete.bind(this)}>Eliminar</a></td>
      </tr>
    );
  }
  confirmDelete() {
    var me = this;
    appActions.deleteUser(this.props.user._id, (err, res) => {
      if (err) {
        res.status(500).json(err);
      }
      me.props.refresh();
    });
  }
}
module.exports = Item;
