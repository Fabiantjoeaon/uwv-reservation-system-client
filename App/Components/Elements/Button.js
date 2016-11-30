'use strict';

import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: rgba(0,0,0,0);
  border: 2px solid ${props => props.color};
  font-size: ${props => props.fontSize};
  cursor: pointer;
  color: ${props => props.color};
  font-family: 'Questrial', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease-out;
  
  &:hover {
    color: #fff;
    background-color: ${props => props.color};
  }

  &:focus {
    outline: none;
  }
`;

export default Button;
