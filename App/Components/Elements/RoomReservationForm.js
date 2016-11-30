'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Input from './Input.js';
import Title from './Title.js';
import Button from './Button.js';
import Notice from './Notice.js';

const ReservationFormTitle = styled(Title)`
  margin-top: 0.5em;
`;

export default class RoomReservationForm extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <ReservationFormTitle color='#fff' fontSize='4em'>{this.props.room.name}</ReservationFormTitle>
    )
  }
}
