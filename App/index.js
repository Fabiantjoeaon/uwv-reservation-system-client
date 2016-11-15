'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import Wrapper from './WrapperStyle.js';

const _ = require('lodash');
const API_URL = 'http://45.55.184.33:8125/api/v1/';

class ReservationClient extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      data: {}
    }

    _.bindAll('_fetchData');
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

  componentDidMount() {
    this._fetchData('test@test.com', 'test', 'customers');
  }

  render() {
		return(
      <Wrapper
        gradientRotation='352deg'
        duration='10s'
        >
      </Wrapper>
		);
	}
}

ReactDOM.render(<ReservationClient/>, document.querySelector('.App'));
