'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

import {makeHoursAndMinutes} from '../../Utils/DateUtils';

import resolveArrayLikeObject from '../../Utils/ResolveArrayLikeObject';

import Button from '../Elements/Button';

const ReservationWrapper = styled.div`
  width: 100%;
`;

const ReservationButton = styled(Button)`
  display: block;
  margin: 0.75em auto;
  &:hover {
    color: ${props => props.type == 'Onderzoekkamer' ? '#b5d0ff !important' : '#C4B7FF !important'};
  }
`;

const ReservationData = styled.div`
  flex-basis: 85%;
  display: block;
  margin-left: 3em;
  color: #fff;

  h1 {
    font-family: 'Crimson Text', serif;
    font-weight: 100;
  }

  h2 {
    font-family: sans-serif;
    font-weight: 100;
  }
`;

const ButtonWrapper = styled.div`
  height:100%;
  flex-basis: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Reservation = styled.div`
  width: 100%;
  height: 12.5em;
  margin: 1em 0em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &::before {
    display: none;
  }
`;

export default class ReservationsOverview extends React.Component {
  constructor() {
    super();

    this.state = {
      reservations: {},
      isLoading: false,
      deletedReservation: null
    }

    _.bindAll(this, '_deleteReservation');
  }

  componentWillMount() {
    this.props.setCurrentPage('My Reservations');
    this._getReservations();
  }

  _getReservations() {
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
      })
      .catch((error) => {
        console.log(error);
        this.setState({reservations: {}})
      });
  }

  _deleteReservation(id) {
    this.props.fetcher.deleteRequestWithToken(`/reservations/${id}`, this.props.token)
      .then((data) => {
        console.log('deleted')
        this.setState({
          deletedReservation: id
        }, () => {
          this._getReservations();
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  _renderReservations() {
    const reservations = resolveArrayLikeObject(this.state.reservations);
    console.log(reservations);
    if(_.isEmpty(reservations)) {
      console.log('no res');
      return <h1>You have no reservations</h1>;
    }

    return reservations.map((reservation, i) => {
      const date = new Date(reservation.start_date_time).toGMTString().slice(0, -13);
      const startTime = makeHoursAndMinutes(reservation.start_date_time);
      const endTime = makeHoursAndMinutes(reservation.end_date_time);

      return (
        <Reservation className={reservation.room.type} key={i}>
          <ReservationData>
            <h1>{reservation.activity} on {date} with {reservation.customer.first_name} {reservation.customer.last_name}</h1>
            <h2>{reservation.description}</h2>
            <h2>{reservation.room.location} on floor {reservation.room.floor} with {reservation.number_persons} persons. From {startTime} till {endTime}</h2>
          </ReservationData>
          <ButtonWrapper>
            <ReservationButton
              name='edit'
              width='7em'
              height='2.5em'
              fontSize='1.2em'
              type={reservation.room.type}
              color='#fff'
              >Edit</ReservationButton>
            <ReservationButton
              name='delete'
              width='7em'
              height='2.5em'
              fontSize='1.2em'
              onClick={() => {this._deleteReservation(reservation.id)}}
              type={reservation.room.type}
              color='#fff'
              >Delete</ReservationButton>
          </ButtonWrapper>
        </Reservation>
      )
    });
  }

  render() {
    return (
      <ReservationWrapper>
        {this.state.deletedReservation ? `Deleted ${this.state.deletedReservation}` : null}
        {!this.state.isLoading ? this._renderReservations() : null}
      </ReservationWrapper>
    )
  }
}
