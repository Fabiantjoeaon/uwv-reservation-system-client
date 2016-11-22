import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  position: relative;
  font-family: 'Questrial', sans-serif;
  font-size: ${props => props.fontSize};
  margin: ${props => props.center ? '2em auto 1em auto' : '0'};
  display: block;
  width: 50%;
  font-weight: ${props => props.fontWeight};
  letter-spacing: 3px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    background-color: #000;
    width: 20%;
    height: 3px;
    bottom:-30%;
    left:0%;
  }
`;

export default Title;
