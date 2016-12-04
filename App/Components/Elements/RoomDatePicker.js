'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';
import DateButton from './DateButton.js';

const DatePickerWrapper = styled.div`
  font-size: 1.5em;
  margin-bottom: 2em;
  width: 100%;
  justify-content: space-between;
  font-weight: 900;
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

//TODO: Make circle and show other add day options like week? Check out tympanus / gooey effects
// http://tympanus.net/codrops/2015/03/10/creative-gooey-effects/
export default class RoomDatePicker extends React.Component {
  constructor() {
      super();
  }

  render() {
    const date = (this.props.currentDate == (new Date).toGMTString().slice(0, -13)) ? `Today: ${this.props.currentDate}` : this.props.currentDate;

    return(
      <DatePickerWrapper>
        {!this.props.isToday ?
        <DateButton
          switchDay={this.props.switchDay}>-1
        </DateButton> : null}
        <Day>{date}</Day>
        <DateButton
          switchDay={this.props.switchDay}
          next={true}>+1</DateButton>
      </DatePickerWrapper>
    );
  }
}
