'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
const TweenMax = require('gsap');
import TransitionGroup from 'react-addons-transition-group';

import APIFetcher from './Utils/APIFetcher.js';
import LoginForm from './Components/LoginForm.js';
import LoadingScreen from './Components/LoadingScreen';
import MoveGradient from './Styles/Keyframes/MoveGradient.js'

const _ = require('lodash');
const API_URL = 'https://dorsia.fabiantjoeaon.com/api/v1';

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

//TODO: How about the wrapper for LoadingScreen??
//TODO: gradient just on loginscreen
class ReservationClient extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      data: {},
      creds: {},
      token: '',
      error: ''
    }

    _.bindAll(this, '_fetchData', '_login');
  }

  _fetchData(email, password) {
    this.setState({ isLoading: true });

    this.fetcher = new APIFetcher(API_URL);
    this.fetcher.authenticateAndFetchToken(email, password)
    .then((data) => {
      // console.log('data', data.json());
      return data.json();
      // this.setState({
      //   isLoading: false,
      //   data: data.data
      // });
    })
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      this.setState({
        error: error
      })
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
    this._fetchData('test@test.com', 'test');
  }

  render() {
		return(
      <Wrapper
        gradientRotation='352deg'
        >
        <TransitionGroup component='div'>
          {this.state.isLoading ?
            <LoadingScreen key='LoadingScreen'/> :
            <LoginForm key='LoginForm' _login={this._login}/>
          }
        </TransitionGroup>
      </Wrapper>
		);
	}
}

ReactDOM.render(<ReservationClient/>, document.querySelector('.App'));
