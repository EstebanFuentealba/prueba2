import Reflux from 'reflux';
import request from 'superagent';
var appActions = require('./../actions');

var userStore = Reflux.createStore({
  mixins: [ Reflux.ListenerMixin],
  init: function() {
    this.listenTo(appActions.addUser, this.addUser);
    this.listenTo(appActions.getUsers, this.getUsers);
    this.listenTo(appActions.getUser, this.getUser);
    this.listenTo(appActions.deleteUser, this.deleteUser);
    this.listenTo(appActions.updateUser, this.updateUser);
  },
  updateUser(id, user, callback) {
    request.put('/api/' + id)
      .send(user)
      .set('Accept', 'application/json')
      .end(callback);
  },
  deleteUser(id, callback) {
    request.del('/api/' + id)
      .set('Accept', 'application/json')
      .end(callback);
  },
  getUser(id, callback) {
    request.get('/api/' + id)
      .set('Accept', 'application/json')
      .end(callback);
  },
  getUsers(callback) {
    request.get('/api')
      .set('Accept', 'application/json')
      .end(callback);
  },
  addUser: function(data, callback) {
    request.post('/api')
      .send(data)
      .set('Accept', 'application/json')
      .end(callback);
  }
});
module.exports = userStore;
