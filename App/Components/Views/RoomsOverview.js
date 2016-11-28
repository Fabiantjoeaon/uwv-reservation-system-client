'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

import FlexWrapper from '../Elements/FlexWrapper';
import Room from '../Elements/Room';

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

    _.bindAll(this, '_getAllRooms', '_getAllReservations');

    this.state = {
      isLoading: false,
      rooms: [],
      reservations: []
    }
  }

  componentDidMount() {
    this._getAllRooms();
    this.socket = io.connect('https://dorsia.fabiantjoeaon.com:8080', {secure: true});

    this.socket.on('connect', (socket) => {
        console.log('connected to node server', socket);
    });

    this.socket.on('room-channel:roomHasUpdated', (data) => {
      console.log('room has updated', data);
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
          rooms: [].concat(...rooms)
        }, () => {
          this._getAllReservations();
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.logout();
        this.props.router.push('/login');
      });
  }

  _getAllReservations() {
    this.props.fetcher.getRequestWithToken('/reservations', this.props.token)
      .then(res => res.json())
      .then((data) => {
        const reservations = [];

        Object.keys(data).map((reservation) => {
          reservations.push(data[reservation]);
        });

        this.setState({
          reservations: [].concat(...reservations),
          isLoading: false
        }, () => {
          console.log(this.state);
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.logout();
        this.props.router.push('/login');
      });
  }

  render() {
    const roomsList = this.state.rooms.map((room, i) => {
            return <Room key={i} room={room} />
          });
    return (
      <PageWrapper>
        <FlexWrapper direction='row' width='100%'>
          {this.state.isLoading ? <h1>Loading</h1> : roomsList}
        </FlexWrapper>
      </PageWrapper>
    )
  }
}
