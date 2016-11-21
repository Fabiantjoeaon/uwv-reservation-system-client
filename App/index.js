'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import CSSTransitionGroup from 'react-addons-css-transition-group';
import styled from 'styled-components';

const TweenMax = require('gsap');
const _ = require('lodash');
const API_URL = 'https://dorsia.fabiantjoeaon.com/api/v1';

import LoginScreen from './Components/LoginScreen.js';
import Dashboard from './Components/Dashboard.js';
import APIFetcher from './Utils/APIFetcher.js';

const handleAuth = () => {
  const currUrl = window.location;
  const token = localStorage.getItem('@TOKEN');
  if(!token) {
    window.location.href = `${currUrl}/login`;
  }
}

//TODO: Change to CSSTransitiongroup?
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
          error: error
        })
      });
  }

  render() {
    const children = React.cloneElement(this.props.children, {
      key: location.pathname,
      login: this._login
    });
		return(
      <div>
        {children}
      </div>
    );
	}
}

ReactDOM.render(<Router history={hashHistory}>
                  <Route path="/" component={ReservationClient}>
                    <Route name="login" path="/login" component={LoginScreen}/>
                    <IndexRoute name="dashboard" onEnter={handleAuth} component={Dashboard}/>
                  </Route>
                </Router>
                , document.querySelector('.App'));
