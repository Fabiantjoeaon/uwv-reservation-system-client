'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import resolveArrayLikeObject from '../../Utils/ResolveArrayLikeObject';

const _ = require('lodash');

const MinuteOverview = styled.div`
  width: 80%;
  height: 50em;
  background-color: #fff;
`;

export default class ReservationOverviewInMinutes extends React.Component {
  constructor() {
    super();

    this.state = { reservations: {} };
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      reservations: nextProps.reservations
    });
  }

  render() {
    const reservations = resolveArrayLikeObject(this.state.reservations);
    reservations.map((res) => {
      console.log(res.activity);
    });

    const startTime = '8:00';
    const endTime = '18:00';
    const totalHours = Math.abs(parseInt(startTime.slice(0, -2)) - parseInt(endTime.slice(0, -2)));
    const totalMinutes = totalHours * 60;
    
    return (
      <MinuteOverview>
        <h1></h1>
      </MinuteOverview>
    )
  }
}
