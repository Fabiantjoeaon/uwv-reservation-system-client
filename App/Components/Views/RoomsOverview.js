'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

import FlexWrapper from '../Elements/FlexWrapper';

const _ = require('lodash');

const RoomsContainer = styled(FlexWrapper)`
  height: 100%;
`;

export default class RoomsOverview extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_getAllRooms');
  }

  componentDidMount() {
    this._getAllRooms();
  }

  _getAllRooms() {
    this.props.fetcher.getRequestWithToken('/rooms', this.props.token)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <RoomsContainer width='100%'>
        <p>Rooms</p>
      </RoomsContainer>
    )
  }
}
