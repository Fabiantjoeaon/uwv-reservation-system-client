'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

import FlexWrapper from '../Elements/FlexWrapper';
import LoadingScreen from './LoadingScreen';
import Room from '../Elements/Room';
import RoomDatePicker from '../Elements/RoomDatePicker';

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
        ].join('-');
};

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

const _ = require('lodash');
const io = require('socket.io-client');
const https = require('https');

const PageWrapper = styled.div`
  position: relative;
`;

//TODO: First animate, then load rooms
export default class RoomsOverview extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_getAllRooms', '_switchDay', '_getReservationsForDate', '_filterReservationsByRoom');

    this.state = {
      isLoading: false,
      rooms: [],
      futureReservations: [],
      date: new Date(),
      isToday: true
    }
  }

  componentWillMount() {
    this._getAllRooms();

    if(this.state.isToday) {
      this.socket = io.connect('https://dorsia.fabiantjoeaon.com:8080', {secure: true});
      this.socket.on('room-channel:roomHasUpdated', (data) => {
        // maybe render room per id??
        const roomId = data.id;
        this._getAllRooms();
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
          isLoading: false
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _filterReservationsByRoom(reservations, id) {
    const reservationForThisRoom = reservations.filter((reservation) => {
      return reservation.room_id == id;
    });
    return reservationForThisRoom;
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
                  fetcher={this.props.fetcher}
                  token={this.props.token}
                  room={room}/>
      });
    } else {
      roomsList = this.state.rooms.map((room, i) => {
        return <Room
                  key={i}
                  ref={room.id}
                  isToday={this.state.isToday}
                  date={this.state.date.yyyymmdd()}
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
        <FlexWrapper direction='row' width='100%'>
          {this.state.isLoading ? <LoadingScreen/> : roomsList}
        </FlexWrapper>
      </PageWrapper>
    )
  }
}
