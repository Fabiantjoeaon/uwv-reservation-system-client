'use strict';

import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  margin-top: 2.5em;
  width: 9em;
  height: 3em;
  background-color: rgba(0,0,0,0);
  border: 2px solid #000;
  cursor: pointer;
  font-family: 'Questrial', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease-out;

  &:hover {
    color: #fff;
    background-color: #000;
  }

  &:focus {
    outline: none;
  }
`;

export default Button;
