'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

const _ = require('lodash');
const API_URL = 'https://dorsia.fabiantjoeaon.com/api/v1';

import LoginScreen from './Components/Views/LoginScreen.js';
import Dashboard from './Components/Views/Dashboard.js';
import APIFetcher from './Utils/APIFetcher.js';
import {handleAuth, handleUnauth} from './Utils/AuthHandlers.js';

//TODO: Change to CSSTransitiongroup?
//TODO: Invalid auth error notice
class ReservationClient extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {},
      error: ''
    }

    this.fetcher = new APIFetcher(API_URL);

    _.bindAll(this, '_login');
  }

  _login(creds) {
    this.fetcher.authenticateAndFetchToken(creds.email, creds.password)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem('@TOKEN', data.token.token);
        this.props.router.push('/');
      })
      .catch((error) => {
        this.setState({
          error: 'Invalid credentials!'
        });
      });
  }

  render() {
    const children = React.cloneElement(this.props.children, {
      key: this.props.location.pathname,
      login: this._login,
      credError: this.state.error
    });
		return(
      <div>
        <TransitionGroup>
          {children}
        </TransitionGroup>
      </div>
    );
	}
}

ReactDOM.render(<Router history={hashHistory}>
                  <Route path="/" component={ReservationClient}>
                    <Route name="login" path="login" onEnter={handleUnauth} component={LoginScreen}/>
                    <IndexRoute name="dashboard" onEnter={handleAuth} component={Dashboard}/>
                  </Route>
                </Router>, document.querySelector('.App'));
