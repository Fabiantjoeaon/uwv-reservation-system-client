'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const _ = require('lodash');

import Input from './Input.js';
import Title from './Title.js';
import Button from './Button.js';
import Notice from './Notice.js';

const ReservationFormTitle = styled(Title)`
  margin-top: 0.5em;
  display: block;
`;

const ReservationForm = styled.form`
  margin: 6em auto 0em auto;
  text-align: center;
`;

export default class RoomReservationForm extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_getClientsForThisRoom', '_handleSubmit', '_getReservationsForDate', '_filterRoomsById');

    this.state = {
      isLoading: false,
      customers: {},
      reservations: {}
    }
  }

  componentWillMount() {
    this._getClientsForThisRoom();
  }

  _getClientsForThisRoom() {
    this.setState({
      isLoading: true
    });

    this.props.fetcher.getRequestWithToken('/me/customers', this.props.token)
      .then(res => res.json())
      .then((data) => {
        this.setState({
            customers: data.data
        }, () => {
          this._getReservationsForDate();
        });
      })
      .catch((error) => {
        this.setState({
          customers: {}
        }, () => {
          this._getReservationsForDate();
        });
      });
  }

  _filterRoomsById(reservations) {
    const filteredReservations = reservations.filter((res) => {
      return this.props.roomId == res.room_id;
    });

    return filteredReservations;
  }

  _getReservationsForDate() {
    this.props.fetcher.getRequestWithToken(`/reservations/date/${this.props.date}`, this.props.token)
      .then(res => res.json())
      .then((data) => {
        const reservations = [];
        data.data.map((reservation) => {
          reservations.push(reservation);
        });
        this.setState({
          reservations: this._filterRoomsById([].concat(...reservations)),
          isLoading: false
        }, () => {
          console.log(this.state);
        });
      })
      .catch((error) => {
        this.setState({
          reservations: {},
          isLoading: false
        })
      });
  }

  _handleSubmit(e) {
    const data = {};
  }

  render() {
    return(
      <div>
        <ReservationFormTitle color='#fff' fontSize='4em'>{this.props.room.name}</ReservationFormTitle>
        <ReservationForm onSubmit={this._handleSubmit}>
          <Input name='activity' ref='activity' type='text' label='Activity' />
        </ReservationForm>
      </div>
    )
  }
}
