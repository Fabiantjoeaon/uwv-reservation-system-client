'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import RoomReservationForm from '../Elements/RoomReservationForm';

const _ = require('lodash');

const RoomReservationWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2em 5em;
  box-sizing: border-box;
  margin: 0 auto;
  background-size: 4000% 4000;
`;

export default class RoomReservationScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      room: {}
    }
  }

  componentWillMount() {
    this.setState({
      isLoading: true
    });
    this.props.fetcher.getRequestWithToken(`/rooms/${this.props.routeParams.id}`, this.props.token)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          room: data.data,
          isLoading: false
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {type} = this.state.room;
    const className = `${type} room-reservation__wrapper`;
    return (
      this.state.isLoading ? <h1>Loading</h1> :
        <RoomReservationWrapper className={className}>
          <RoomReservationForm room={this.state.room}/>
        </RoomReservationWrapper>
    )
  }
}
