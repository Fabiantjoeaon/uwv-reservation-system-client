import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  position: relative;
  font-family: 'Questrial', sans-serif;
  font-size: 2.5em;
  display: block;
  width: 50%;
  margin: 0em auto 1em auto;
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

const Title = (props) => {
  return (
    <StyledTitle fontWeight={props.fontWeight}>{props.children}</StyledTitle>
  )
}

export default Title;
