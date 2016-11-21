'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

const TweenMax = require('gsap');
const _ = require('lodash');
const API_URL = 'https://dorsia.fabiantjoeaon.com/api/v1';

import LoginScreen from './Components/LoginScreen.js';
import Dashboard from './Components/Dashboard.js';
import APIFetcher from './Utils/APIFetcher.js';

//TODO: How about the wrapper for LoadingScreen??
//TODO: gradient just on loginscreen
class ReservationClient extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {},
      token: '',
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
        this.setState({
          token: data.token.token
        }, () => {
          console.log(this.props);
        });
      })
      .catch((error) => {
        this.setState({
          error: error
        })
      });
  }

  render() {
		return React.cloneElement(this.props.children, {login: this._login});
	}
}

ReactDOM.render(<Router history={hashHistory}>
                  <Route path="/" component={ReservationClient}>
                    <Route name="login" path="/login" component={LoginScreen}/>
                    <IndexRoute name="dashboard" component={Dashboard}/>
                  </Route>
                </Router>
                , document.querySelector('.App'));
