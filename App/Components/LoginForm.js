'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Input from './Input.js';
const _ = require('lodash');

const StyledLoginFormWrapper = styled.div`
  position: absolute;
  top:20%;
  left:25%;
  width: 50%;
  height: 55%;
  background-color: rgba(255,255,255,0.75);
`;

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

//TODO: Write input Component
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

    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

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
        {this.state.error}
        <StyledLoginForm onSubmit={this._handleSubmit}>

          <Input name='email' ref='email' type='email' label='E-mail' />
          <Input name='password' ref='password' label='Password' />
          <input name='submit' type='submit' value='Login'/>
        </StyledLoginForm>
      </StyledLoginFormWrapper>
    )
  }
}
