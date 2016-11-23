'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

import FlexWrapper from '../Elements/FlexWrapper';
import Room from '../Elements/Room';

const _ = require('lodash');

const RoomsContainer = styled(FlexWrapper)`
  flex-wrap: wrap;
`;


//TODO: First animate, then load rooms
export default class RoomsOverview extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_getAllRooms');

    this.state = {
      isLoading: false,
      rooms: []
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this._getAllRooms();
  }

  _getAllRooms() {
    this.props.fetcher.getRequestWithToken('/rooms', this.props.token)
      .then(res => res.json())
      .then((data) => {
        const rooms = [];

        Object.keys(data).map((room) => {
          console.log(data[room]);
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

  render() {
    const roomsList = this.state.rooms.map((room, i) => {
            const type = room.type.toLowerCase();
            return <Room key={i} type={room.type} room={room} />
          });
    return (
      <RoomsContainer direction='row' width='100%'>
        {this.state.isLoading ? <h1>Loading</h1> : roomsList}
      </RoomsContainer>
    )
  }
}
