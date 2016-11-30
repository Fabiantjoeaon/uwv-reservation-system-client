'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';
import Button from './Button';

const DatePickerWrapper = styled.div`
  font-size: 1.5em;
  margin-bottom: 2em;
  width: 100%;
  justify-content: space-between;
  font-weight: 900;
`;

const AdjacentDateButtonPrevious = styled(Button)`
  position: absolute;
  padding: 0.5em 0em 1em 0em;
  left: 0;
  top: 0;
`;

const AdjacentDateButtonNext = styled(Button)`
  position: absolute;
  padding: 0.5em 0em 1em 0em;
  right: 0;
  top: 0;
`;

const Day = styled.p`
  display: block;
  margin: 0 auto;
  text-align: center;
  font-family:sans-serif;
  font-weight: 100;
  font-size: 1.6em;
  color: rgb(153, 153, 153);
  padding: 0em 1em;
`;

export default class RoomDatePicker extends React.Component {
  constructor() {
      super();
  }

  render() {
    const date = (this.props.currentDate == (new Date).toGMTString().slice(0, -13)) ? `Today: ${this.props.currentDate}` : this.props.currentDate;

    return(
      <DatePickerWrapper>
        {!this.props.isToday ?
        <AdjacentDateButtonPrevious
          width='8em'
          height='2.5em'
          fontSize='1em'
          color='rgb(89, 89, 89)'
          data-adj='Previous'
          onClick={() => { this.props.switchDay(-1) }}>Previous</AdjacentDateButtonPrevious> : null}
        <Day>{date}</Day>
        <AdjacentDateButtonNext
          width='8em'
          height='2.5em'
          fontSize='1em'
          color='rgb(89, 89, 89)'
          data-adj='Next'
          onClick={() => { this.props.switchDay(1) }}>Next</AdjacentDateButtonNext>
      </DatePickerWrapper>
    );
  }
}
