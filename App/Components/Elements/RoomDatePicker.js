'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

const DatePickerWrapper = styled.div`
  font-size: 1.5em;
  margin-bottom: 1em;

  font-weight: 900;
`;

const AdjacentDateButton = styled.span`
  width: 40px;
  height: 10px;
  color: rgb(97, 97, 97);
  cursor: pointer;
  font-family: sans-serif;
  position: relative;
  box-sizing: border-box;

  &::before {
    content: attr(data-adj);
    width: 100%;
    height: 0%;
    color: #fff;
    opacity:0;
    background-color: rgba(120, 120, 120, 0.8);
    position: absolute;
    display: block;
    bottom:0;
    right:0;
    left:0;
    top:0;

    transition: all 0.2s ease-out;
  }

  &:hover::before{
    height: 100%;
    opacity:1;
  }
`;

const Day = styled.p`
  display: inline;
  font-family:sans-serif;
  font-weight: 100;
  color: rgb(153, 153, 153);
  padding: 0em 1em;
`;

export default class RoomDatePicker extends React.Component {
  constructor() {
      super();
  }

  componentDidMount() {
  }

  render() {
    const date = (this.props.currentDate == (new Date).toGMTString().slice(0, -13)) ? `Today: ${this.props.currentDate}` : this.props.currentDate;

    return(
      <DatePickerWrapper>
        <AdjacentDateButton className="datepicker__previous" data-adj='Previous' onClick={() => { this.props.switchDay(-1) }}>Previous</AdjacentDateButton>
          <Day>{date}</Day>
        <AdjacentDateButton className="datepicker__next" data-adj='Next' onClick={() => { this.props.switchDay(1) }}>Next</AdjacentDateButton>
      </DatePickerWrapper>
    );
  }
}
