'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

import Input from './Input.js';
import Title from './Title.js';
import Button from './Button.js';
import Notice from './Notice.js';

const TweenMax = require('gsap');
const _ = require('lodash');

const StyledLoginFormWrapper = styled.div`
  padding-top: 5em;
  position: absolute;
  top:20%;
  left:25%;
  width: 50%;
  height: 50%;
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

//TODO: Submit data to login
//TODO: For moving state up, create function in parent, maybe bind this to the child???
export default class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      error: ''
    }
    _.bindAll(this, '_handleSubmit');
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.setGradient({
        primaryColor: 'rgb(58, 98, 176)',
        secundaryColor: 'rgb(50, 154, 221)',
        tertaryColor: 'rgb(58, 98, 176)',
        duration: '20s'
      });
    }, 2000);
  }

  componentWillEnter(callback) {
    const node = ReactDOM.findDOMNode(this);
    setTimeout(() => {TweenMax.to(node, 0.8, {ease: Power2.easeOut, opacity: 1, y: 0}).eventCallback('onComplete', callback)}, 2500);
  }

  componentWillLeave(callback) {
    const node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 0.8, {ease: Power2.easeOut, opacity: 1, y: 60}).eventCallback('onComplete', callback);
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
      this.props._login(data);
      this.setState({
        error: ''
      });
    } else {
      this.setState({
        error: 'Please fill in all the fields'
      });
    }
  }

  render() {
    return (
      <StyledLoginFormWrapper>
        <Title fontWeight='100'>Log In</Title>
        <StyledLoginForm onSubmit={this._handleSubmit}>
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
