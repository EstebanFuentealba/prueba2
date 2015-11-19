import Reflux from 'reflux';
import appActions from './../actions';
import request from 'superagent';

const userStore = Reflux.createStore({
    listenables: [appActions],
    onLoadedUsersSuccess: function(users) {
      this.trigger(users);
    },
    uploadFile: function(id, files) {
      return new Promise((resolve, error) => {
        var req = request.post('/upload/' + id);
        files.forEach((file)=> {
          if (file.type == 'image/jpeg' || file.type == 'image/jpg') {
            req.attach(file.name, file);
          }
        });
        req.end((req , res) => {
          if(res.error) {
            error(res.serverError)
          } else if(res.body) {
            resolve(res.body);
          }
        });
      });
    },
    addUser: function(data) {
      return new Promise((resolve, error) => {
        request.post('/api')
          .send(data)
          .set('Accept', 'application/json')
          .end((req , res) => {
            if(res.error) {
              error(res.serverError)
            } else if(res.body) {
              resolve(res.body);
            }
          });
      });
    },
    updateUser(id, user) {
      return new Promise((resolve, error) => {
        request.put('/api/' + id)
          .send(user)
          .set('Accept', 'application/json')
          .end((req , res) => {
            if(res.error) {
              error(res.serverError)
            } else if(res.body) {
              resolve(res.body);
            }
          });
      });
    },
    deleteUser(id) {
      return new Promise((resolve, error) => {
        request.del('/api/' + id)
          .set('Accept', 'application/json')
          .end((req , res) => {
            if(res.error) {
              error(res.serverError)
            } else if(res.body) {
              appActions.getUsers();
              resolve(res.body);
            }
          });
      });
    }
});
module.exports = userStore;
