'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default class Dashboard extends React.Component {
  constructor() {
      super();
  }

  componentWillEnter(callback) {
    console.log('ds did enter');
    callback();
  }

  componentWillAppear(callback) {
    console.log('ds did appear');
    callback();
  }

  componentWillLeave(callback) {
    console.log('ds did leave');
    callback();
  }

  _logout() {
    localStorage.removeItem('token');
    this.props.router.push('login');
  }

  render() {
    return(
      <h1>Dashboard</h1>
    )
  }
}
