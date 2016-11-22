'use strict';

import React from 'react';
import styled from 'styled-components';

const Link = styled.a`

  font-size: 0.8em;
  cursor: pointer;
  text-align: center;
  font-weight: 900;
  position: relative;
  text-transform: uppercase;
  font-family: 'Questrial', sans-serif;
  transition: all 0.3s ease-out;
  color: #000;

  &::before {
    position: absolute;
    content: '';
    height: 2px;
    width: 0%;
    bottom:-8px;
    left:0;
    background-color: #000;
    transition: 0.2s ease-out;
  }

  &:hover::before {
    width: 100%;
  }

  &:focus {
    outline: none;
  }
`;

export default Link;
