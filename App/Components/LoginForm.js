'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Input from './Input.js';
import Title from './Title.js';
import Button from './Button.js';
import Notice from './Notice.js';

const _ = require('lodash');

const StyledLoginFormWrapper = styled.div`
  padding-top: 5em;
  position: absolute;
  top:20%;
  left:25%;
  width: 50%;
  height: 50%;
  background-color: rgba(255,255,255,1);
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

//TODO: Submit data to login
//TODO: Transitions
//TODO: For moving state up, create function in parent, maybe bind this to the child???
//TODO: Validation with handleChange??
//TODO: Styled button
export default class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      error: ''
    }
    _.bindAll(this, '_handleSubmit');
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
        error: 'Please fill in all the fields.'
      });
    }
  }

  render() {
    return (
      <StyledLoginFormWrapper>
        <Title fontWeight='100'>Log In</Title>
        <StyledLoginForm onSubmit={this._handleSubmit}>
          {this.state.error ? <Notice type='error' notice={this.state.error}/> : null}
          <Input name='email' ref='email' type='email' label='E-mail' />
          <Input name='password' ref='password' type='password' label='Password' />
          <Button name='submit' type='submit'>Login</Button>
        </StyledLoginForm>
      </StyledLoginFormWrapper>
    )
  }
}
