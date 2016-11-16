import React from 'react';
import styled from 'styled-components';

const styledTitle = styled.h1`
  font-family: 'Questrial', sans-serif;
  font-size: 3em;
`;

const Title = (props) => {
  return (
    <styledTitle>{props.children}</styledTitle>
  )
}

export default Title;
