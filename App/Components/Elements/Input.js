'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const _ = require('lodash');

import styled from 'styled-components';

const StyledInputWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  position: relative;
  margin: 1.75em 0em 4em 0em;
  display: block;

  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: ${props => props.color};
  }
`;

const StyledLabel = styled.label`
  top: -40%;
  left: -0.5%;
  position: absolute;
  font-size: 1.6em;
  padding: 2px 3px 1px 2px;
  background-color: rgba(0,0,0,0);
  font-family: sans-serif;
  color: ${props => props.color};
  text-align: left;
  pointer-events: none;
  transition: all 0.3s;

  &::after {
    content: attr(data-label);
    opacity: 0;
    transition: all 0.3s;
    width: 0%;
    height: 100%;
    position: absolute;
    top:0;
    padding: 2px 3px 1px 3px;
    left:0;
    background-color: ${props => props.color};
    color: ${props => props.secondColor};
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2em;
  position: relative;
  background-color: rgba(0,0,0,0);
  font-family: sans-serif;
  font-size: 1.5em;
  margin-top: 0.5em;
  color: ${props => props.color};
  border: none;
  padding: 20px 0px;
  transition: all 0.3s ease-out;

  &:focus {
    outline: none;
  }

  &:invalid + .input__wrapper::after {
    background-color: rgb(255, 54, 0);
  }

  &:focus + .input__label::after {
    width: 100%;
    opacity: 1;
  }

  &:focus ~ .input__wrapper::after {
    height: 2px;
  }
`;

export default class Input extends React.Component {
  constructor() {
    super();
  }

  render() {
    const {name, type, label, inputRef, value} = this.props;

    return (
      <StyledInputWrapper color={this.props.color} className='input__wrapper'>
        <StyledInput color={this.props.color} className='input__input' value={value} autoComplete='off' name={name} type={type}/>
        <StyledLabel color={this.props.color} secondColor={this.props.secondColor} className='input__label' data-label={label} htmlFor={name}>{label}</StyledLabel>
      </StyledInputWrapper>
    );
  }
}
