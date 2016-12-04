'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

const StyledDateButton = styled.button`
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  left: ${props => !props.next ? 0 : null};
  right: ${props => props.next ? 0 : null};
  filter: url('assets/filters/goo.svg#goo');
  border: 1px solid #787878;
  color: #787878;
  background-color: rgb(224, 224, 224);
  transition: all 0.2s ease-out;
  padding: 15px;
  &:focus {
    outline: none;
  }
  &:hover {
    color: #fff;
    background-color: #787878;
  }
`;

export default class DateButton extends React.Component {
  constructor() {
    super();
  }

  render() {
    const val = this.props.next ? 1 : -1;
    return(
      <StyledDateButton onClick={() => { this.props.switchDay(val) }} next={this.props.next}>{this.props.children}</StyledDateButton>
    )
  }
}
