'use strict';

import React from 'react';

import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';
import LoginForm from './LoginForm.js';
import LoadingScreen from './LoadingScreen';
import MoveGradient from '../Styles/Keyframes/MoveGradient.js'

const Wrapper = styled.div`
  position: relative;
  background: repeating-linear-gradient(
    rgb(58, 98, 176),
    rgb(50, 154, 221),
    rgb(230, 80, 224)
  );
  background-size: 4000% 4000%;
  width:100vw;
  height:100vh;
  animation: ${MoveGradient} 15s infinite linear;
  font-family: 'Lora', sans-serif;
`;

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    }
  }

  render() {
    return (
      <Wrapper
        gradientRotation='352deg'
        >
        <TransitionGroup component='div'>
          {this.state.isLoading ?
            <LoadingScreen key='LoadingScreen'/> :
            <LoginForm key='LoginForm' login={this.props.login}/>
          }
        </TransitionGroup>
      </Wrapper>
    )
  }
}
