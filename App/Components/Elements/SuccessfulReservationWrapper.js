'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const StyledSuccessWrapper = styled.div`
  width: 50%;
  height: 50%;
  border: 1px solid #fff;
  margin: 5em auto 0em auto;
`;

const ReservationData = styled.h3`
  color: #fff;
  font-weight: 100;
  font-size: 1.6em;
  ${props => props.center ? 'text-align: center' : 'padding-left: 2em'};
`;

const Line = styled.hr`
  width: 100%;
`;

const SuccessfulReservationWrapper = (reservationObj) => {
  const reservation = reservationObj.reservation;
  return (
    <StyledSuccessWrapper>
      <ReservationData center>Planned {reservation.activity} for {reservation.number_persons}</ReservationData>
      <Line/>
      <ReservationData>Description: {reservation.description}</ReservationData>
      <ReservationData>From {reservation.start_date_time} to {reservation.end_date_time}</ReservationData>
    </StyledSuccessWrapper>
  )
}

export default SuccessfulReservationWrapper;
