import 'whatwg-fetch';
const _ = require('lodash');

//TODO: POST & GET different? how about authentication?? JWT! https://www.toptal.com/web/cookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs
export default class DataFetcher {
  constructor(apiUrl, email, password, resource) {
    _.bindAll(this, 'fetch');

    this.apiUrl = apiUrl;
    this.email = email;
    this.password = password;
    this.resource = resource;
    this.data = {};
  }

  async fetch() {
    const hashedCredentialsString = btoa(`${this.email}:${this.password}`);

    const data = await fetch(`${this.apiUrl}${this.resource}`, {
      method: 'get',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Authorization': `Basic ${hashedCredentialsString}`,
        'Content-Type': 'application/json'
      },
    });

    return data;
  }
}
