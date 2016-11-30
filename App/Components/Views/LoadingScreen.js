'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled, {keyframes} from 'styled-components';

const moveLoader = keyframes`
  0% {
    transform: translateX(-65px)
  }
  50% {
    transform: translateX(65px)
  }
  100% {
    transform: translateX(-65px)
  }
`;

const Loader = styled.span`
  width: 100px;
  height: 5px;
  margin: 0 auto;
  background-color: #000;
  animation: ${moveLoader} 1.3s ease-out infinite;
  animation-fill-mode: forwards;
`;

export default class LoadingScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <Loader/>
    )
  }
}
