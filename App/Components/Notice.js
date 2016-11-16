'use strict';

import React from 'react';
import styled from 'styled-components';

const StyledNotice = styled.span`
  background-color: ${props => props.type = 'error' ? 'rgb(219, 100, 73)' : 'rgb(213, 206, 47)'};
  padding: 10px 20px;
  text-align: center;
  font-family: 'Questrial', sans-serif;
`;

const Notice = (props) => {
  const {notice} = props;
  return (
    <StyledNotice>{notice}</StyledNotice>
  );
}

export default Notice;
