import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import SessionActions from './actions/SessionActions';
import SessionStore from './stores/SessionStore';

import api from './api';

import App from './App.jsx';
import LoggedInLayout from './components/LoggedInLayout.jsx';
import AboutPage from './components/AboutPage.jsx';

import TasklistsPageContainer from './containers/TasklistsPage.jsx';
import TasksPageContainer from './containers/TasksPage.jsx';
import LoginPageContainer from './containers/LoginPage.jsx';

window.handleGoogleApiLoaded = () => {
  SessionActions.authorize(true, renderApp);
};

function renderApp() {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <Route path='/login' component={LoginPageContainer} />
                <Route component={LoggedInLayout} onEnter={requireAuth}>
                  <Route path='/about' component={AboutPage} />
                  <Route path='/lists' component={TasklistsPageContainer}>
                      <Route path='/lists/:id' component={TasksPageContainer} />
                  </Route>
                </Route>
            </Route>
        </Router>,
        document.getElementById('mount-point')
    );
}

function requireAuth(nextState, replace) {
  console.log("requireAuth");
  console.log(SessionStore.isLoggedIn());
  if (!SessionStore.isLoggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}
