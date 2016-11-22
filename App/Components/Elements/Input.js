'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const _ = require('lodash');

import styled from 'styled-components';

const StyledInputWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  position: relative;
  margin: 1.75em 0em;

  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: rgb(0, 0, 0);
  }
`;

const StyledLabel = styled.label`
  top: -40%;
  left: -0.5%;
  position: absolute;
  font-size: 1.4em;
  padding: 2px 3px 1px 2px;
  background-color: rgba(0,0,0,0);
  font-family: 'Lora', sans-serif;
  color: #000;
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
    padding: 2px 3px 1px 2px;
    left:0;
    background-color: rgb(0,0,0);
    color: #fff;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2em;
  position: relative;
  background-color: rgba(0,0,0,0);
  font-family: 'Lora', serif;
  font-size: 1.4em;
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
      <StyledInputWrapper className='input__wrapper'>
        <StyledInput className='input__input' value={value} autoComplete='off' name={name} type={type}/>
        <StyledLabel className='input__label' data-label={label} htmlFor={name}>{label}</StyledLabel>
      </StyledInputWrapper>
    );
  }
}
