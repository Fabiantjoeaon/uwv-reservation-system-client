'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import FlexWrapper from '../Elements/FlexWrapper';
import LoadingScreen from './LoadingScreen';
import Room from '../Elements/Room';
import RoomDatePicker from '../Elements/RoomDatePicker';
import FilterBar from '../Elements/FilterBar';

Date.prototype.yyyymmdd = function() {
  const mm = this.getMonth() + 1;
  const dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
        ].join('-');
};

Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const _ = require('lodash');
const io = require('socket.io-client');
const https = require('https');

const PageWrapper = styled.div`
  position: relative;
`;

const ResetFilterButton = styled.div`
  padding: 20px;
  cursor: pointer;
`;

//TODO: First animate, then load rooms
export default class RoomsOverview extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_getAllRooms', '_switchDay', '_getReservationsForDate', '_filterReservationsByRoom', '_filterRoomsByOption', '_resetFilters');

    this.state = {
      isLoading: false,
      rooms: [],
      futureReservations: [],
      date: new Date,
      isToday: true,
      filters: {}
    }
  }

  componentWillMount() {
    this._getAllRooms();
    // FIXME: On first reseed gets extra reservations???
    this._getReservationsForDate();
    if(this.state.isToday) {
      this.socket = io.connect('https://dorsia.fabiantjoeaon.com:8080', {secure: true});
      this.socket.on('room-channel:roomHasUpdated', (data) => {
        // maybe render room per id??
        const roomId = data.id;
        this._getAllRooms();
      });
      this.socket.on('room-channel:roomIsFree', (data) => {
        console.log(data);
      });
    } else {
      console.log('is not today');
    }
  }

  _switchDay(index) {
    const today = new Date;
    const dayPlusState = this.state.date.addDays(index);
    // Set today in state if the added day equals to today
    if(dayPlusState.yyyymmdd() == today.yyyymmdd()) {
      this.setState({
        date: today,
        isToday: true
      }, () => {
        this._getReservationsForDate();
      });
    } else {
      this.setState({
        date: this.state.date.addDays(index),
        isToday: false
      }, () => {
        this._getReservationsForDate();
      });
    }
  }

  _getReservationsForDate() {
    this.setState({
      isLoading: true
    });
    this.props.fetcher.getRequestWithToken(`/reservations/date/${this.state.date.yyyymmdd()}`, this.props.token)
      .then(res => res.json())
      .then((data) => {
        const reservations = [];
        data.data.map((reservation) => {
          reservations.push(reservation);
        });
        this.setState({
          futureReservations: [].concat(...reservations),
          isLoading: false
        });
      })
      .catch((error) => {
        this.setState({
          futureReservations: {},
          isLoading: false
        })
      });
  }

  _getAllRooms() {
    this.setState({
      isLoading: true
    });
    this.props.fetcher.getRequestWithToken('/rooms', this.props.token)
      .then(res => res.json())
      .then((data) => {
        const rooms = [];
        Object.keys(data).map((room) => {
          rooms.push(data[room]);
        });
        this.setState({
          rooms: [].concat(...rooms),
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.logout();
      });
  }

  _filterReservationsByRoom(reservations, id) {
    if(_.isEmpty(reservations)) return;
    const reservationForThisRoom = reservations.filter((reservation) => {
      return reservation.room_id == id;
    });

    return reservationForThisRoom;
  }


  _filterRoomsByOption(key, value) {
    const filters = this.state.filters;
    if(value == 'all') {
      delete filters[key];
      this.setState({filters: filters});
    } else {
      filters[key] = value;
      this.setState({filters: filters});
    }
  }

  _resetFilters() {
    this.setState({
      filters: {}
    });
  }

  render() {
    /** TODO Build filter to filter rooms based on props,
     *  add class instead of display none so that its still available in DOM,
     *  also dont reset on new day
     */
    const dateString = this.state.date.toGMTString().slice(0, -13);
    let roomsList;
    // Better performance wise
    if(this.state.isToday || _.isEmpty(this.state.futureReservations)) {
    roomsList = this.state.rooms.map((room, i) => {
        return <Room
                  key={i}
                  ref={room.id}
                  isToday={this.state.isToday}
                  date={this.state.date.yyyymmdd()}
                  filters={this.state.filters}
                  fetcher={this.props.fetcher}
                  token={this.props.token}
                  room={room}
                  futureReservation={this.state.futureReservations ? this._filterReservationsByRoom(this.state.futureReservations, room.id) : null}/>
      });
    } else {
      roomsList = this.state.rooms.map((room, i) => {
        return <Room
                  key={i}
                  ref={room.id}
                  isToday={this.state.isToday}
                  date={this.state.date.yyyymmdd()}
                  filters={this.state.filters}
                  fetcher={this.props.fetcher}
                  token={this.props.token}
                  room={room}
                  futureReservation={this._filterReservationsByRoom(this.state.futureReservations, room.id)}/>
      });
    }

    return (
      <PageWrapper>
        <RoomDatePicker
          isToday={this.state.isToday}
          switchDay={this._switchDay}
          currentDate={this.state.date.toGMTString().slice(0, -13)}/>
        {!_.isEmpty(Object.values(this.state.filters)) ? <ResetFilterButton onClick={() => {this._resetFilters()}}>Reset filters</ResetFilterButton> : null}
        <FilterBar filters={this.state.filters} filterRoomsByOption={this._filterRoomsByOption}/>
        <FlexWrapper direction='row' width='100%'>
          {this.state.isLoading ? <LoadingScreen/> : roomsList}
        </FlexWrapper>
      </PageWrapper>
    )
  }
}
