import Reflux from 'reflux';

var appActions = Reflux.createActions([
  'getPage',
  'setPage',
  'addUser',
  'getUsers',
  'getUser',
  'deleteUser',
  'updateUser'
]);

module.exports = appActions;
