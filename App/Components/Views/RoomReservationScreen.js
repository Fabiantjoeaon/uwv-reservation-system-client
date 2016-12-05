'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import RoomReservationForm from '../Elements/RoomReservationForm';
import LoadingScreen from './LoadingScreen';

const _ = require('lodash');

const RoomReservationWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  height: auto;
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
    this.props.setCurrentPage('Place a reservation');
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
    //FIXME: Fix disappearing loadingscreen
    return (
      this.state.isLoading ? <LoadingScreen/> :
        <RoomReservationWrapper className={className}>
          <RoomReservationForm fetcher={this.props.fetcher} customers={this.props.customers} date={this.props.location.query.date} roomId={this.props.routeParams.id} token={this.props.token} room={this.state.room}/>
        </RoomReservationWrapper>
    )
  }
}
