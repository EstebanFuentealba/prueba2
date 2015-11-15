import React from 'react';
import Item from './Item';

class ListUser extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var me = this;
    return (<div className="small-12 large-8 columns">
        <table className="columns">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha de Nacimiento</th>
              <th colSpan="3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(function(user){
              return <Item key={user._id} user={user} refresh={me.props.refresh} />;
            })}

          </tbody>
        </table>
      </div>);
  }
}
module.exports = ListUser;
