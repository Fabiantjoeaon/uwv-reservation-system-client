'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

import Input from './Input.js';
import Title from './Title.js';
import Button from './Button.js';
import Notice from './Notice.js';
import shallowCompare from '../../Utils/shouldComponentUpdateHelpers.js';

const TweenMax = require('gsap');
const _ = require('lodash');

const StyledLoginFormWrapper = styled.div`
  padding-top: 5em;
  position: absolute;
  top:15%;
  left:15%;
  width: 65%;
  height: 65%;
  background-color: rgba(255,255,255,1);
  opacity: 0;
  transform: translateY(160px);
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default class LoginForm extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_handleSubmit');

    this.state = {
      error: ''
    }
  }

  componentWillAppear(callback) {
    const node = ReactDOM.findDOMNode(this);
    setTimeout(() => {TweenMax.to(node, 0.8, {ease: Power2.easeOut, opacity: 1, y: 0}).eventCallback('onComplete', callback)}, 1500);
  }

  componentWillReceiveProps(nextProps) {
    const {error} = nextProps;
    this.setState({
      error: error
    });
  }

  _handleSubmit(e) {
    e.preventDefault();

    const email = ReactDOM.findDOMNode(this.refs.email).children.email.value;
    const password = ReactDOM.findDOMNode(this.refs.password).children.password.value;

    if(!(email.length == 0 || password.length == 0)) {
      const data = {
        email: email,
        password: password
      }
      this.props.login(data);
    } else {
      this.setState({
        error: 'Please fill in all the fields!'
      });
    }
  }

  render() {
    return (
      <StyledLoginFormWrapper>
        <Title fontWeight='100'>Log In</Title>
        <StyledLoginForm autoComplete='off' onSubmit={this._handleSubmit}>
          <TransitionGroup>
            {this.state.error ? <Notice key='notice' type='error' notice={this.state.error}/> : null}
          </TransitionGroup>
          <Input name='email' ref='email' type='email' label='E-mail' />
          <Input name='password' ref='password' type='password' label='Password' />
          <Button name='submit' type='submit'>Login</Button>
        </StyledLoginForm>
      </StyledLoginFormWrapper>
    )
  }
}
