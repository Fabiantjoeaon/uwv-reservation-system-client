'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const _ = require('lodash');

import styled, {keyframes} from 'styled-components';

const MoveText = keyframes`
  0% {
    left: 5%;
  }

  100% {
    /* left: auto; */
    left: -100%;
  }
`;

const ProgressMeter = styled.div`
  width: ${props => props.percentage}%;
  height: 10%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(255,255,255,0.4);
  z-index: 1;
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
  ${''/* animation: ${MoveText} 5s infinite alternate ease-in-out;*/}
`;

export default class ActivityProgressMeter extends React.Component {
  constructor(props) {
    super(props);

    _.bindAll(this, '_setPercentage');

    this.state = {
      percentage: '0'
    }
  }

  _setPercentage() {
    this.setState({
      percentage: this.props.returnPercentage(this.props.reservation.start_date_time, this.props.reservation.end_date_time)
    })
  }

  componentDidMount() {
    this.interval = setInterval(this._setPercentage, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //TODO: Render text pos absolute on top of meter
  render() {
    const {activity} = this.props.reservation;
    return (
      <div>
        <ProgressMeter percentage={this.state.percentage}/>
        <Activity ref='act'><strong>Now:</strong> {activity}</Activity>
      </div>
    )
  }
}
