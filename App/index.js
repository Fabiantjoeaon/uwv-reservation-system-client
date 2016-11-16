'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
const TweenMax = require('gsap');
import TransitionGroup from 'react-addons-transition-group';
import 'whatwg-fetch';

import LoginForm from './Components/LoginForm.js';
import LoadingScreen from './Components/LoadingScreen';
import MoveGradient from './Styles/Keyframes/MoveGradient.js'

const _ = require('lodash');
const API_URL = 'http://45.55.184.33:8125/api/v1/';

const Wrapper = styled.div`
  position: relative;
  background: repeating-linear-gradient(
    ${props => props.gradientRotation},
    ${props => props.primaryColor},
    ${props => props.secundaryColor},
    ${props => props.tertaryColor ? props.tertaryColor : null});
  background-size: 3500% 3500%;
  width:100vw;
  height:100vh;
  animation: ${MoveGradient} ${props => props.duration} infinite linear;
  font-family: 'Lora', sans-serif;
`;

class ReservationClient extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      data: {},
      creds: {},
      gradient: {}
    }

    _.bindAll(this, '_fetchData', '_login', '_setGradient');
  }

  /**
   * Fetch data from Dorsia API
   * TODO: extract to export function??
   * TODO: Check screenshot on phone for better error handling
   */
  _fetchData(email, password, resource) {
    this.setState({
      isLoading: true
    });
    const hashedCredentialsString = btoa(`${email}:${password}`);
    //TODO: On wrong creds maybe show error screen?
    fetch(`${API_URL}${resource}`, {
      method: 'get',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Authorization': `Basic ${hashedCredentialsString}`,
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json() )
      .then((jsonData) => {
        console.log(jsonData.data);
        this.setState({
          isLoading: false,
          data: jsonData.data
        })
      })
      .catch((exception) => {
        console.log('There was an error: ', exception);
      });
  }

  _setGradient(gradient) {
    this.setState({
      gradient: gradient
    });
  }

  _login(creds) {
    this.setState({
      creds: {
        email: creds.email,
        password: creds.password
      }
    }, () => {
      console.log(this.state);
    });
  }

  componentDidMount() {
    this._fetchData('test@test.com', 'test', 'customers');
  }

  render() {
		return(
      <Wrapper
        gradientRotation='352deg'
        primaryColor={this.state.gradient.primaryColor}
        secundaryColor={this.state.gradient.secundaryColor}
        tertaryColor={this.state.gradient.tertaryColor}
        duration={this.state.gradient.duration}
        >
        <TransitionGroup component='div'>
          {this.state.isLoading ?
            <LoadingScreen setGradient={this._setGradient.bind(this)} key='LoadingScreen'/> :
            <LoginForm setGradient={this._setGradient.bind(this)} key='LoginForm' _login={this._login}/>
          }
        </TransitionGroup>
      </Wrapper>
		);
	}
}

ReactDOM.render(<ReservationClient/>, document.querySelector('.App'));
