'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';
const _ = require('lodash');

const StyledInputWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  position: relative;
  margin: 1em 0em;
`;

const StyledLabel = styled.label`
  font-size: 1em;
  top: 10%;
  left: 0%;
  position: absolute;
  padding: 0 0.25em;
  background-color: rgba(0,0,0,0);
  font-family: 'Lora', sans-serif;
  text-align: left;
  pointer-events: none;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2em;
  position: relative;
  background-color: rgba(0,0,0,0);
  border-top:none;
  border-bottom:1px solid #858585;
  border-left: none;
  border-right: none;
  padding: 20px 0px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;

    background-color: rgb(97, 153, 194);
  }

  &:focus + label {
    font-size: 0.5em;
    top:0%;
  }

  &:invalid {
    border-bottom:3px solid rgb(219, 100, 73);
  }
`;

export default class Input extends React.Component {

  render() {
    const {name, type, label, inputRef} = this.props;

    return (
      <StyledInputWrapper>
        <StyledLabel htmlFor={name}>{label}</StyledLabel>
        <StyledInput name={name} type={type} ref={inputRef} />
      </StyledInputWrapper>
    );
  }
}
