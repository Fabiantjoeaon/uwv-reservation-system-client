'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import TransitionGroup from 'react-addons-transition-group';
import LoginForm from './Components/LoginForm.js';
import MoveGradient from './Styles/Keyframes/MoveGradient.js'

const _ = require('lodash');
const API_URL = 'http://45.55.184.33:8125/api/v1/';

const Wrapper = styled.div`
  position: relative;
  background: repeating-linear-gradient(${props => props.gradientRotation}, #cc6bbb, #e6b11f);
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
      isLoading: false,
      data: {},
      creds: {}
    }

    _.bindAll(this, '_fetchData', '_login');
  }

  /**
   * Fetch data from Dorsia API
   */
  _fetchData(email, password, resource) {
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
  //render this.props.children??
  render() {
		return(
      <Wrapper
        gradientRotation='352deg'
        duration='10s'
        >
        <LoginForm _login={this._login}/>
      </Wrapper>
		);
	}
}

ReactDOM.render(<ReservationClient/>, document.querySelector('.App'));
