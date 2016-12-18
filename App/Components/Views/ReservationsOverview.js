'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

import {makeHoursAndMinutes} from '../../Utils/DateUtils';

import resolveArrayLikeObject from '../../Utils/ResolveArrayLikeObject';

import Button from '../Elements/Button';

Date.prototype.yyyymmdd = function() {
  const mm = this.getMonth() + 1;
  const dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
        ].join('-');
};

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

const NewReservationSticker = styled.div`
  border: 3px solid rgb(120, 120, 120);
  text-align: center;
  color: rgb(120, 120, 120);
  font-weight: 900;
  padding: 1em;
  position: absolute;
  top: -4%;
  left: -4%;
`;

const ReservationData = styled.div`
  flex-basis: 85%;
  display: block;
  margin: 0.3em 0em 0em 3em;
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

const DeletedReservation = styled.h1`
  padding: 10px;
  font-weight: 100;
  background-color: #a6a6a6;
  color: rgb(120, 120, 120);
`;

const NoReservationText = styled.h2`
  font-weight: 100;
`;

export default class ReservationsOverview extends React.Component {
  constructor() {
    super();

    this.state = {
      reservations: {},
      isLoading: false,
      deletedReservation: {},
      error: ''
    }

    _.bindAll(this, '_deleteReservation', '_redirectToEdit');
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
        if(typeof data.data === 'string') {
          this.setState({
            error: data.data,
            isLoading: false
          });
          return;
        }
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
        this.setState({error: error, isLoading: false})
      });
  }

  _deleteReservation(id) {
    this.props.fetcher.deleteRequestWithToken(`/reservations/${id}`, this.props.token)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          deletedReservation: {
            id: id,
            activity: data.activity
          }
        }, () => {
          this._getReservations();
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  _redirectToEdit(reservationId, roomId, date) {
    const dateString = new Date(date).yyyymmdd();
    this.props.router.push(`/room/${roomId}/?date=${dateString}&reservation=${reservationId}`);
  }

  _renderReservations() {
    if(this.state.error) return <NoReservationText>{this.state.error}</NoReservationText>;

    const reservations = resolveArrayLikeObject(this.state.reservations);
    return reservations.map((reservation, i) => {
      const date = new Date(reservation.start_date_time).toGMTString().slice(0, -13);
      const startTime = makeHoursAndMinutes(reservation.start_date_time);
      const endTime = makeHoursAndMinutes(reservation.end_date_time);

      return (
        <Reservation className={reservation.room.type} key={i}>
          {this.props.router.location.query.new == reservation.id ? <NewReservationSticker>NEW</NewReservationSticker> : null}
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
              onClick={() => {this._redirectToEdit(reservation.id, reservation.room.id, reservation.start_date_time)}}
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
        {!_.isEmpty(this.state.deletedReservation) ? <DeletedReservation>Deleted activity {this.state.deletedReservation.activity} with ID {this.state.deletedReservation.id}</DeletedReservation> : null}
        {!this.state.isLoading ? this._renderReservations() : null}
      </ReservationWrapper>
    )
  }
}
