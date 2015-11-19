import React from 'react';
import Reflux from 'reflux';
import ListUser from './ListUser';
import CreateUser from './CreateUser';
import reactMixin from 'react-mixin';
import appActions from './../actions';
import userStore from './../stores/userStore';

export default class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.listenTo(userStore, this.userStoreListener);
  }
  userStoreListener(users) {
    this.setState({users: users});
  }
  componentWillMount() {
    appActions.getUsers();
  }
  render() {
    return <div>
      <ListUser users={this.state.users} />
      <CreateUser/>
    </div>
  }
}
reactMixin(Index.prototype, Reflux.ListenerMixin);
