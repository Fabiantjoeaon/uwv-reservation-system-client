'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
const TweenMax = require('gsap');
import TransitionGroup from 'react-addons-transition-group';

import DataFetcher from './Utils/DataFetcher.js';
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


//TODO: How about the wrapper for LoadingScreen??
class ReservationClient extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      data: {},
      creds: {},
      gradient: {},
      error: ''
    }

    _.bindAll(this, '_fetchData', '_login', '_setGradient');
  }

  _fetchData(email, password, resource) {
    this.setState({ isLoading: true });

    this.fetcher = new DataFetcher(API_URL, email, password, resource);
    this.fetcher.fetch()
    .then(response => response.json())
    .then((data) => {
      this.setState({
        isLoading: false,
        data: data.data
      });
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        error: error

      })
    });
    console.log(this.state);
  }

  _setGradient(gradient) {
    this.setState({
      gradient: gradient
    });
  }

  _login(creds) {
    this.setState({
      isLoading: true,
      creds: {
        email: creds.email,
        password: creds.password
      }
    }, () => {
      this._fetchData(this.state.creds.email, this.state.creds.password, 'me');
    });
  }

  componentDidMount() {
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
