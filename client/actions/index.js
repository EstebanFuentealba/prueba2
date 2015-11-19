import Reflux from 'reflux';
import request from 'superagent';
const appActions = Reflux.createActions([
  'getUsers',
  'getUser',
  'addUser',
  'deleteUser',
  'updateUser',
  'uploadFile',
  'loadedUsersSuccess',
]);

appActions.getUsers.listen(function () {
  request.get('/api')
    .set('Accept', 'application/json')
    .end(function(req , res) {
      if(res.body) {
        appActions.loadedUsersSuccess( res.body );
      }
    });
});
appActions.getUser.listen(function (id) {
  request.get('/api/' + id)
    .set('Accept', 'application/json')
    .end(function(req , res) {
      if(res.body) {
        appActions.loadedUsersSuccess( [res.body] );
      }
    });
});
module.exports = appActions;
