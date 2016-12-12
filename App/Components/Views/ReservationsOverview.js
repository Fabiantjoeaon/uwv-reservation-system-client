'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

import resolveArrayLikeObject from '../../Utils/ResolveArrayLikeObject';

const Reservation = styled.div`
  width: 100%;
  height: 10%;
`;

export default class ReservationsOverview extends React.Component {
  constructor() {
    super();

    this.state = {
      reservations: {},
      isLoading: false
    }
  }

  componentWillMount() {
    this.props.setCurrentPage('My Reservations');
    this.setState({isLoading: true});
    this.props.fetcher.getRequestWithToken('/me/reservations', this.props.token)
      .then((res) => res.json())
      .then((data) => {
        const reservations = [];
        data.data.map((reservation) => {
          reservations.push(reservation);
        });
        this.setState({
          reservations: [].concat(...reservations),
          isLoading: false
        });
      });
  }

  _renderReservations() {
    const reservations = resolveArrayLikeObject(this.state.reservations);
    return reservations.map((reservation, i) => {
      return (
        <Reservation key={i}>{reservation.activity}</Reservation>
      )
    });
  }

  render() {
    return (
      <div>
        <h1>My Reservations</h1>
        {!this.state.isLoading ? this._renderReservations() : null}
      </div>
    )
  }
}
