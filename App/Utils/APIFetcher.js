import 'whatwg-fetch';
const _ = require('lodash');

export default class APIFetcher {
  constructor(apiUrl) {
    _.bindAll(this, 'authenticateAndFetchToken', 'getRequestWithToken');

    this.apiUrl = apiUrl;
    this.data = {};
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

  async getRequestWithToken(resource) {
    try {
      const response = await fetch(`${this.apiUrl}${this.resource}/token=${this.token}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const responseJson = await response.json();
      return responseJson;
    } catch(error) {
      return error;
    }

  }
}
