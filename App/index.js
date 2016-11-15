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
  _fetchData(username, password, resource) {
    const credentialsString = btoa(`${username}:${password}`);
    fetch(`${API_URL}${resource}`, {
      method: 'get',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Authorization': `Basic ${credentialsString}`,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        return response.json();
      })
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
        >
      </Wrapper>
		);
	}
}

ReactDOM.render(<ReservationClient/>, document.querySelector('.App'));
