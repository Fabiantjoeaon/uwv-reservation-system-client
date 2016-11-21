import 'whatwg-fetch';
const _ = require('lodash');

//TODO: POST & GET different? how about authentication?? JWT! https://www.toptal.com/web/cookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs
export default class APIFetcher {
  constructor(apiUrl) {
    _.bindAll(this, 'setToken', 'authenticateAndFetchToken', 'getRequestWithToken');

    this.apiUrl = apiUrl;
    this.data = {};
    this.token = '';
  }

  setToken(token) {
    this.token = token;
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
        console.log(error);
    }
  }

  async getRequestWithToken(resource) {
    // const hashedCredentialsString = btoa(`${this.email}:${this.password}`);
    // const {apiUrl, resource, token} = this;
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
      console.log(error);
    }

  }
}
