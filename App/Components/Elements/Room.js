'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

const StyledRoom = styled.a`
  width: ${props => props.width}
  height: ${props => props.width}
  margin: 2em 0em;
  text-decoration: none;
  color: #fff;

  &:visited {
    color: #fff;
  }
`;

export default class Room extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {name, type} = this.props.room;
    return (
      <StyledRoom className={type} width='calc(100% / 4.75)' href='#'>
        <h2 className='room__name'>{name}</h2>
      </StyledRoom>
    );
  }
}
