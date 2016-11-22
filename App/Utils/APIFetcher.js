import 'whatwg-fetch';
const _ = require('lodash');

export default class APIFetcher {
  constructor(apiUrl) {
    _.bindAll(this, 'authenticateAndFetchToken', 'getRequestWithToken');

    this.apiUrl = apiUrl;
  }

  async authenticateAndFetchToken(email, password) {
    try {
      const response = fetch(`${this.apiUrl}/login?email=${email}&password=${password}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      return response;
    } catch(error) {
      return error;
    }
  }

  async getRequestWithToken(resource, token) {
    try {
      const response = await fetch(`${this.apiUrl}${resource}/token=${token}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      return response;
    } catch(error) {
      return error;
    }

  }
}
