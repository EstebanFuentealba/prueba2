import React from 'react';
import Reflux from 'reflux';
import reactMixin from 'react-mixin';
import ListUser from './ListUser';
import CreateUser from './CreateUser';
import appActions from './../actions';
import userStore from './../stores/userStore';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {

    this.listenTo(userStore, function(data) {
      console.log(data);
    });
    this.refreshData();

  }
  render() {
    return (<div className="small-12 columns">
      <ListUser users={this.state.users} refresh={this.refreshData.bind(this)} />
      <CreateUser onClick={this.saveUser.bind(this)}/>
    </div>);
  }
  refreshData() {
    var me = this;
    appActions.getUsers(function(err, res) {
      if (err) {
        res.status(500).json(err);
      }
      me.setState({
        users: res.body
      });
    });
  }
  saveUser(data) {
    var me = this;
    appActions.addUser(data, function(err, res) {
      if (err) {
        res.status(500).json(err);
      }
      me.state.users.push(res.body);
      me.setState({
        users: me.state.users
      });
    });
  }
}
reactMixin(App.prototype, Reflux.ListenerMixin);
module.exports = App;
