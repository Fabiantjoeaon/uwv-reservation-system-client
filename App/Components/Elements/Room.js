'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

import ActivityProgressMeter from './ActivityProgressMeter';
import {convertDateTimeToTime} from '../../Utils/DateUtils.js';

const _ = require('lodash');

const StyledRoom = styled.a`
  display: ${props => props.shouldRoomBeShowed ? 'block' : 'none'};
  width: ${props => props.width}
  height: calc(${props => props.width} + 10em);
  text-decoration: none;
  color: #fff;
  position: relative;
  overflow: hidden;

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

export default class Room extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_getReservedRoomData', '_renderFutureReservations', '_reduceFilters');

    this.state = {
      reservation: {}
    }
  }

  componentWillMount() {
    this.props.room.is_reserved_now ? this._getReservedRoomData(this.props.room.id) : null;
  }

  /**
   *
   */
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

  /**
   *
   */
  _renderFutureReservations() {
      if (!_.isEmpty(this.props.futureReservation)){
        const total = this.props.futureReservation.length;
        // Ensure you always return the first reservation, so that index 0 in array is the first one
        this.props.futureReservation.sort((a, b) => {
          return new Date(a.start_date_time).getTime() - new Date(b.start_date_time).getTime();
        });
        const time = convertDateTimeToTime(this.props.futureReservation[0].start_date_time);
        return (
          <h3 className='room__meta room__not-free'>
            This room has {total}{total == 1 ? ' reservation ' : ' reservations '}for {this.props.isToday ? 'today' : 'this day'},&nbsp;{'\n'}
            {total == 1 ? 'starting at ' : 'the first one starts at '}{time}.
          </h3>);
      }
  }

  /**
   * _reduceFilters
   * @param [propFilters] Filters given from props
   * @description Finds similiraties between room properties and filters properties,
   * and reduces the filters array to an array with the mathing keys
   * @return [array]
   */
  _reduceFilters(propFilters) {
    const room = this.props.room;
    const filters = propFilters;
    const equals = []

    return _.reduce(filters, (result, value, key) => {
        // Uppercase values don't match
        if(typeof room[key] == 'string') {
          return room[key].toLowerCase() == value ?
            result.concat(key) : result;
        }
        // Minimal capacity shouldn't be equal, but check any room greater than
        if(key == 'capacity') {
          console.log('capacity')
          return room[key] >= value ?
            result.concat(key) : result;
        } else {
          return room[key] == value ?
            result.concat(key) : result;
        }
    }, []);
  }

  /**
   * _checkIfRoomIsFiltered
   * @description Checks if amount of filters apply to a room, true means
   * it meets the filter conditions, and the room should be displayed
   * @returns [boolean]
   */
  _checkIfRoomIsFiltered() {
    const filters = this._reduceFilters(this.props.filters);
    return filters.length == Object.keys(this.props.filters).length;
  }

  render() {
    const {
      id,
      name,
      floor,
      type,
      is_reserved_now,
      capacity,
      has_pc,
      color,
      invalid
    } = this.props.room;

    const typeLowerCase = type.toLowerCase();
    const className = is_reserved_now && this.props.isToday ? `${typeLowerCase} occupied` : `${typeLowerCase}`;
    const url = `#/room/${id}/?date=${this.props.date}`;
    const boxClassName = `room__color-box ${color}`;

    return (
      <StyledRoom shouldRoomBeShowed={this._checkIfRoomIsFiltered()} className={className} width='calc(100% / 4)' href={url}>
        <h2 className='room__name'>{name}</h2>
        <h3 className='room__meta'>{type}</h3>
        <h3 className='room__meta'>Max {capacity} person(s)</h3>
        <h3 className='room__meta'>{color}</h3>
        {has_pc ? <h3 className='room__meta'>PC available</h3> : null}
        {invalid ? <h3 className='room__meta'>Invalid</h3> : null}
        {!is_reserved_now ? this._renderFutureReservations() : null}
        {is_reserved_now && this.props.isToday ?
          <ActivityProgressMeter reservation={this.state.reservation} /> : this._renderFutureReservations()}
      </StyledRoom>
    );
  }
}
