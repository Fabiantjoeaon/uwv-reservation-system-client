import 'whatwg-fetch';
const _ = require('lodash');

export default class APIFetcher {
  constructor(apiUrl, logoutFn) {
    _.bindAll(this, 'authenticateAndFetchToken', 'getRequestWithToken');

    this.apiUrl = apiUrl;
  }

  async authenticateAndFetchToken(email, password) {
    try {
      const response = fetch(`${this.apiUrl}/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'email': email,
          'password': password
        })
      });
      return response;
    } catch(error) {
      return error;
    }
  }

  async postRequestWithToken(resource, token, data) {
    try {
      const response = fetch(`${this.apiUrl}${resource}?token=${token}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return response;
    } catch(error) {
      return error;
    }
  }

  async getRequestWithToken(resource, token) {
    try {
      const response = await fetch(`${this.apiUrl}${resource}?token=${token}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      if(response.status == 401) {
        // Unauthorized
        window.location.href = 'http://localhost:8888/reservation-client';
      } else {
        return response;
      }
    } catch(error) {
      return error;
    }
  }
}
