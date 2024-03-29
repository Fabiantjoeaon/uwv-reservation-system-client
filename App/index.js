'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

const _ = require('lodash');
const API_URL = 'https://dorsia.fabiantjoeaon.com/api/v1';

import LoginScreen from './Components/Views/LoginScreen';
import Dashboard from './Components/Views/Dashboard';
import RoomsOverview from './Components/Views/RoomsOverview';
import ReservationsOverview from './Components/Views/ReservationsOverview';
import RoomReservationScreen from './Components/Views/RoomReservationScreen';
import ClientsOverview from './Components/Views/ClientsOverview';

import APIFetcher from './Utils/APIFetcher.js';
import {handleAuth, handleUnauth} from './Utils/AuthHandlers.js';

class ReservationClient extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {},
      error: '',
      fetcher: new APIFetcher(API_URL)
    }

    _.bindAll(this, '_login', '_logout', '_retrieveFromLocalStorage', '_setError');
  }

  /**
   * Retrieves an item from local storage
   * @param [item] Item to retrieve
   * @returns [string]? Fetched item from local storage
   *
   */
  _retrieveFromLocalStorage(item) {
    const data = localStorage.getItem(item);
    return data;
  }

  /**
   *
   */
  _setError(error) {
    this.setState({ error: error });
  }

  /**
   * _login
   * @description Logs in with given credentials from form
   * ans sets token bound to username in local storage.
   * @param [creds] Credentials object from form with username and password
   * @returns [void]
   */
  _login(creds) {
    this.state.fetcher.authenticateAndFetchToken(creds.email, creds.password)
      .then(res => res.json())
      .then((data) => {
        const {user, token} = data;
        localStorage.setItem('@TOKEN', token.token);
        localStorage.setItem('@USERNAME', user.name);
        this.props.router.push('/');
        this._setError('');
      })
      .catch((error) => {
        //FIXME: how to catch status codes??
        this._setError('Your email and password are incorrect!');
        //FIXME: Maybe logout and check if curr location is login? if not then redirect, could fix login bug
        this._logout();
      });
  }

  _logout() {
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@USERNAME');

    !(this.props.location.pathname == '/login') ? this.props.router.push('/login') : null;
  }

  render() {
    const children = React.cloneElement(this.props.children, {
      key: this.props.location.pathname,
      login: this._login,
      logout: this._logout,
      setError: this._setError,
      credError: this.state.error,
      fetcher: this.state.fetcher,
      retrieveFromLocalStorage: this._retrieveFromLocalStorage
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
// FIXME: Router 'middleware', maybe ask StackOverflow
// TODO: Routes as child from dashboard??
ReactDOM.render(<Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
                  <Route component={ReservationClient}>
                    <Route name='login' path='login' onEnter={handleUnauth} component={LoginScreen}/>
                    <Route path='/' name='dashboard' onEnter={handleAuth} component={Dashboard}>
                      <IndexRoute name='rooms' component={RoomsOverview}/>
                      <Route path='room/:id' component={RoomReservationScreen}/>
                      <Route name='reservations' path='reservations' component={ReservationsOverview}/>
                      <Route name='clients' path='clients' component={ClientsOverview}/>
                    </Route>
                  </Route>
                </Router>, document.querySelector('.App'));
