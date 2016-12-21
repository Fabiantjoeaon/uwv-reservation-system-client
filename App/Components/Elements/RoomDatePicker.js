'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

const DatePickerWrapper = styled.div`
  font-size: 1.5em;
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 35%;
  justify-content: center;
  font-weight: 900;
`;

const Day = styled.p`
  text-align: center;
  font-family:sans-serif;
  font-weight: 100;
  width: 70%;
  font-size: 1.6em;
  color: rgb(153, 153, 153);
  padding: 0em 1em;
`;

const StyledDateButton = styled.button`
  cursor: pointer;
  position: relative;
  color: rgb(153, 153, 153);
  border: none;
  border-bottom: 2px solid rgb(153, 153, 153);
  transition: all 0.2s ease-out;
  height: 2.5em;
  font-size: 1.3em;
  margin-top: 1em;
  padding: 5px 15px;
  background-color: rgba(0,0,0,0);
  &:focus {
    outline: none;
  }
  &:hover {
    border-color: #787878;
    color: #787878;
  }
`;

const TotalReservations = styled.p`
  position: absolute;
  bottom: -2.25em;
  font-family: 'Crimson Text', serif;
  font-size: 1.2em;
  font-weight: 100;
  font-style: italic;
  color: rgb(153, 153, 153);
`;

const DateButton = (props) => {
  const {next, switchDay, children} = props;
  const val = next ? 1 : -1;

  return(
    <StyledDateButton onClick={() => { switchDay(val) }} next={next}>{children}</StyledDateButton>
  );
}

export default class RoomDatePicker extends React.Component {
  constructor() {
      super();
  }

  render() {
    const date = (this.props.currentDate == (new Date).toGMTString().slice(0, -13)) ? `Today: ${this.props.currentDate}` : this.props.currentDate;

    return(
      <DatePickerWrapper>
        <TotalReservations>{!_.isEmpty(this.props.reservations) ? `- ${this.props.reservations.length} reservations today -` : '- No reservations today -'}</TotalReservations>
        {!this.props.isToday ?
        <DateButton
          switchDay={this.props.switchDay}>&#60;
        </DateButton> : null}
        <Day>{date}</Day>
        <DateButton
          switchDay={this.props.switchDay}
          next={true}>&#62;</DateButton>
      </DatePickerWrapper>
    );
  }
}
