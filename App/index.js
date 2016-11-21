'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

const TweenMax = require('gsap');
const _ = require('lodash');
const API_URL = 'https://dorsia.fabiantjoeaon.com/api/v1';

import LoginScreen from './Components/LoginScreen.js';
import APIFetcher from './Utils/APIFetcher.js';

//TODO: How about the wrapper for LoadingScreen??
//TODO: gradient just on loginscreen
class ReservationClient extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      data: {},
      token: '',
      error: ''
    }

    this.fetcher = new APIFetcher(API_URL);

    _.bindAll(this, '_fetchData', '_login');
  }

  _fetchData(resource) {
    // this.setState({ isLoading: true });
  }

  _login(creds) {
    this.setState({
      isLoading: true,
    });

    this.fetcher.authenticateAndFetchToken(creds.email, creds.password)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          token: data.token.token
        }, () => {
          console.log(this.state);
        });
      })
      .catch((error) => {
        this.setState({
          error: error
        })
      });
  }

  render() {
		return(
      <Router history={browserHistory}>
        <Route path="/reservation-client/" component={(props, state, params) => <LoginScreen login={this._login} {...props} />}/>
      </Router>
		);
	}
}

ReactDOM.render(<ReservationClient/>, document.querySelector('.App'));
