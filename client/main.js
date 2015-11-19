import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, History } from 'react-router';
import App from './components/App';
import DetailUser from './components/DetailUser';
import UpdateUser from './components/UpdateUser';
import Index from './components/Index';
import NotFound from './components/NotFound';
import Welcome from './components/Welcome';
import CreateUser from './components/CreateUser';
import { createHistory, useBasename } from 'history';

const history = useBasename(createHistory)({
  basename: '/mdstr'
});

const target = document.getElementById('app');
var routes = (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="users" component={Index} />
      <Route path="users/detail/:id" component={DetailUser}/>
      <Route path="users/edit/:id" component={UpdateUser}/>
      <Route path="users/new" component={CreateUser}/>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
ReactDOM.render(routes, target);
