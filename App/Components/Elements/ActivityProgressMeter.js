'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const _ = require('lodash');

import styled, {keyframes} from 'styled-components';

const ProgressMeter = styled.div`
  width: ${props => props.percentage}%;
  height: 10%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(255,255,255,0.4);
  z-index: 1;
  transition: all 0.3s ease-out;
  will-change: width;
`;

const Activity = styled.span`
  position: absolute;
  bottom: 10px;
  color: rgb(120, 120, 120);
  z-index: 2;
  width: 100%;
  left: 10px;
  font-weight: 100;
  margin-top: 10px;
  font-family: sans-serif;
  white-space: nowrap;
  display: inline-block;
`;

export default class ActivityProgressMeter extends React.Component {
  constructor(props) {
    super(props);

    _.bindAll(this, '_setPercentage', '_returnActivityMeterPercentage');

    this.state = {
      percentage: '0'
    }
  }

  _returnActivityMeterPercentage(startTime, endTime) {
    const startTimeEpoch = new Date(startTime).getTime();
    const endTimeEpoch = new Date(endTime).getTime();
    const nowEpoch = (new Date).getTime();

    const percentage = ((nowEpoch - startTimeEpoch) / (endTimeEpoch - startTimeEpoch)) * 100;
    return percentage;
  }

  _setPercentage() {
    this.setState({
      percentage: this._returnActivityMeterPercentage(this.props.reservation.start_date_time, this.props.reservation.end_date_time)
    });
  }

  componentDidMount() {
    this.interval = setInterval(this._setPercentage, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {activity, end_date_time} = this.props.reservation;
    const endDate = new Date(end_date_time);
    const h = endDate.getHours();
    const m = (endDate.getMinutes()<10?'0':'') + endDate.getMinutes();
    const time = `${h}:${m}`;
    return (
      <div>
        <ProgressMeter percentage={this.state.percentage}/>
        <Activity ref='act'><strong>Now:</strong> {activity} till {time}</Activity>
      </div>
    )
  }
}
