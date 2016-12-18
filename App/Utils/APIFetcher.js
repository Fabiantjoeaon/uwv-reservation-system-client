import 'whatwg-fetch';
const _ = require('lodash');

export default class APIFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  /**
   * POST user data and fetch token
   */
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

  /**
   * POST request to API with authenticated user token
   */
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

  /**
    * GET request to API with authenticated user token
    */
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

  /**
    * DELETE request to API with authenticated user token and resource id
    */
  async deleteRequestWithToken(resource, token) {
    try {
      const response = fetch(`${this.apiUrl}${resource}?token=${token}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      return response;
    } catch(error) {
      return error;
    }
  }

  /**
    * EDIT request to API with authenticated user token and resource id
    */
  async editRequestWithToken(resource, token, data) {
    try {
      const response = fetch(`${this.apiUrl}${resource}?token=${token}`, {
        method: 'PUT',
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
}
