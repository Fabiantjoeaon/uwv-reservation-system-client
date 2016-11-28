'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

const StyledRoom = styled.a`
  width: ${props => props.width}
  height: calc(${props => props.width} + 5em);
  text-decoration: none;
  color: #fff;
  position: relative;

  &:visited {
    color: #fff;
  }

  @media(max-width: 1020px) {
    width: calc(${props => props.width} * 2);
  }

  @media(max-width: 720px) {
    width: calc(100%);
  }
`;

const RoomColorBox = styled.div`
  width: 2em;
  height: 2em;
`;

export default class Room extends React.Component {
  constructor() {
    super();
  }

  // TODO: Fetch user and reservation when occupied??
  // Only on shouldComponentUpdate (because next state should be different)

  render() {
    const {
      id,
      name,
      type,
      is_reserved_now,
      capacity,
      has_pc,
      color,
      invalid
    } = this.props.room;
    const typeLowerCase = type.toLowerCase();
    const className = is_reserved_now ? `${typeLowerCase} occupied` : `${typeLowerCase}`;
    const url = `room/${id}`;
    const boxClassName = `room__color-box ${color}`;

    return (
      <StyledRoom className={className} width='calc(100% / 4)' href={url}>
        <h2 className='room__name'>{name}</h2>
        <h3 className='room__meta'>{type}</h3>
        <h3 className='room__meta'>Max {capacity} person(s)</h3>
        <h3 className='room__meta'>{color}</h3>
        {has_pc ? <h3 className='room__meta'>PC available</h3> : null}
        {invalid ? <h3 className='room__meta'>Invalid</h3> : null}
        {is_reserved_now ? <h3 className='room__meta'>CURRENTLY OCCUPIED</h3> : null}
      </StyledRoom>
    );
  }
}
