'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Dashboard extends React.Component {
  constructor() {
      super();
  }
  componentWillEnter() {
      console.log('hey');
  }

  _logout() {
    localStorage.removeItem('token');
    this.props.router.push('/login');
  }

  render() {
    return(
      <h1>Dashboard</h1>
    )
  }
}
