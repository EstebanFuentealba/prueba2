import React from 'react';
import reactMixin from 'react-mixin';
import { Col, Row, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  render() {
    return (<Row>
      <Col sm={12} md={2} lg={2}>
        Menu
        <ListGroup>
          <ListGroupItem><Link to="/users" params={this.state.users} className="btn btn-default">Usuarios</Link></ListGroupItem>
          <ListGroupItem><Link to="/users/new" className="btn btn-default">Nuevo</Link></ListGroupItem>
        </ListGroup>
      </Col>
      <Col sm={12} md={10} lg={10}>
        <Panel>
          <Row>
            {this.props.children}
          </Row>
        </Panel>
      </Col>
    </Row>);
  }
}
reactMixin(App.prototype, History);
module.exports = App;
