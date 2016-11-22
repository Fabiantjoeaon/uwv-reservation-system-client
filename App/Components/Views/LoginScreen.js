'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';
import LoginForm from '../Elements/LoginForm.js';
import MoveGradient from '../../Styles/Keyframes/MoveGradient.js'

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
  transform: translateY(120vh);
`;

export default class LoginScreen extends React.Component {
  constructor() {
    super();
  }

  componentWillEnter(callback) {
    const node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 0.5, {delay: 0.5, ease: Power2.easeOut, opacity: 1, y: 0}).eventCallback('onComplete', callback);
  }

  componentWillAppear(callback) {
    const node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 0.5, {delay: 0.5, ease: Power2.easeOut, opacity: 1, y: 0}).eventCallback('onComplete', callback);
  }

  componentWillLeave(callback) {
    const node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 0.3, {delay: 0.5, ease: Power2.easeOut, y: -1000}).eventCallback('onComplete', callback);
  }

  render() {
    return (
      <Wrapper
        gradientRotation='352deg'
        >
        <TransitionGroup component='div'>
          <LoginForm key='LoginForm' error={this.props.credError} login={this.props.login}/>
        </TransitionGroup>
      </Wrapper>
    )
  }
}
