'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';
const _ = require('lodash');

const styledInputWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const styledLabel = styled.label`
  font-size: 0.5em;
  position: absolute;
  padding: 10px;
  background-color: rgba(0,0,0,0);
`;

const styledInput = styled.input`
  width: 100%;
  border-radius: 15px;
`;

export default class Input extends React.Component {

  render() {
    const {name, type, label} = this.props;
    return (
      <styledInputWrapper>
        <styledLabel htmlFor={name}>{label}</styledLabel>
        <styledInput name={name} type={type} />
      </styledInputWrapper>
    );
  }
}
