'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

export default class ReservationsOverview extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.setCurrentPage('My Reservations');
  }

  render() {
    return (
      <h1>My Reservations</h1>
    )
  }
}
