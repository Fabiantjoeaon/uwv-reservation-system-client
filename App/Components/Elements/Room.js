'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

const _ = require('lodash');

const StyledRoom = styled.a`
  width: ${props => props.width}
  height: calc(${props => props.width} + 10em);
  text-decoration: none;
  color: #fff;
  position: relative;

  &:visited {
    color: #fff;
  }

  @media(max-width: 1020px) {
    width: calc(${props => props.width} * 2);
  }

  @media(max-width: 720px) {
    width: calc(100%);
  }
`;

const RoomColorBox = styled.div`
  width: 2em;
  height: 2em;
`;

export default class Room extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_getReservedRoomData', '_returnActivityMeterPercentage');

    this.state = {
      reservation: {}
    }
  }

  componentDidMount() {
    this.props.room.is_reserved_now ? this._getReservedRoomData(this.props.room.id) : null;
  }

  _getReservedRoomData(id) {
    this.props.fetcher.getRequestWithToken(`/rooms/${id}/active-reservation`, this.props.token)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          reservation: data.data[0]
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  //TODO: Make styled component of meter
  _returnActivityMeterPercentage(startTime, endTime) {
    const startTimeEpoch = new Date(startTime).getTime();
    const endTimeEpoch = new Date(endTime).getTime();
    const now = (new Date);
    const nowWithoutUTC = new Date(now.valueOf() + now.getTimezoneOffset() * 60000);
    const nowEpoch = nowWithoutUTC.getTime();

    const percentage = ((nowEpoch - startTimeEpoch) / (endTimeEpoch - startTimeEpoch)) * 100;
    console.log(startTime, nowWithoutUTC, endTime, percentage);

    return percentage;
  }

  // TODO: Only on shouldComponentUpdate (because next state should be different)
  render() {
    const {
      id,
      name,
      type,
      is_reserved_now,
      capacity,
      has_pc,
      color,
      invalid
    } = this.props.room;
    const typeLowerCase = type.toLowerCase();
    const className = is_reserved_now ? `${typeLowerCase} occupied` : `${typeLowerCase}`;
    const url = `room/${id}`;
    const boxClassName = `room__color-box ${color}`;

    if(this.state.reservation.activity) {
      this._returnActivityMeterPercentage(this.state.reservation.start_date_time, this.state.reservation.end_date_time);
    }

    return (
      <StyledRoom className={className} width='calc(100% / 4)' href={url}>
        <h2 className='room__name'>{name}</h2>
        <h3 className='room__meta'>{type}</h3>
        <h3 className='room__meta'>Max {capacity} person(s)</h3>
        <h3 className='room__meta'>{color}</h3>
        {has_pc ? <h3 className='room__meta'>PC available</h3> : null}
        {invalid ? <h3 className='room__meta'>Invalid</h3> : null}
        {is_reserved_now ? <h3 className='room__meta'>Now: {this.state.reservation.activity}</h3> : null}
        {is_reserved_now ? <div className='room__activity-meter'></div> : null}
      </StyledRoom>
    );
  }
}
