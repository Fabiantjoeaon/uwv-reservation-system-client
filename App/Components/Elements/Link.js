'use strict';

import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  text-decoration: none;
  font-size: 1.8em;
  cursor: pointer;
  text-align: center;
  font-weight: 100;
  position: relative;
  
  transition: all 0.3s ease-out;
  color: rgb(144, 144, 144);

  &::before {
    position: absolute;
    content: '';
    height: 1px;
    width: 0%;
    bottom:-8px;
    left:0;
    background-color: #000;
    transition: 0.2s ease-out;
  }

  &:visited {
    color: rgb(144, 144, 144);
  }

  &:hover {
    color: #000;
  }

  &:hover::before {
    width: 100%;
  }

  &:focus {
    outline: none;
  }
`;

export default Link;
