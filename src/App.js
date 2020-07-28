import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login';
import HomePage from './pages/HomePage';
import { history } from './helpers/index';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function App() {
  return (
    <Router history={history}>
      <ReactNotification />
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/' exact component={HomePage} />
        {/* <Redirect from='*' to='/login' component={LoginPage} /> */}
      </Switch>
    </Router>
  );
}

export default App;
