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

    _.bindAll(this, '_getAllRooms');

    this.state = {
      isLoading: false,
      rooms: [],
      day: new Date()
    }
  }

  componentWillMount() {
    console.log(this.state.day)
    this._getAllRooms();
    this.socket = io.connect('https://dorsia.fabiantjoeaon.com:8080', {secure: true});

    this.socket.on('room-channel:roomHasUpdated', (data) => {
      const roomId = data.id;
      //TODO: only rerender one room per id (set new state?, fetch single room in room.js? )
      this._getAllRooms();
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
        this.props.logout();
        this.props.router.push('/login');
      });
  }

  render() {
    const roomsList = this.state.rooms.map((room, i) => {
      return <Room key={i} ref={room.id} fetcher={this.props.fetcher} token={this.props.token} room={room} />
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
