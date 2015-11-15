import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from 'react-router';
import App from './components/App';
import DetailUser from './components/DetailUser';
import UpdateUser from './components/UpdateUser';
const target = document.getElementById('app');
var routes = (
  <Router>
    <Route path="/" component={App} />
    <Route path="/detalle/:id" component={DetailUser}/>
    <Route path="/editar/:id" component={UpdateUser}/>
  </Router>
);
ReactDOM.render(routes, target);
