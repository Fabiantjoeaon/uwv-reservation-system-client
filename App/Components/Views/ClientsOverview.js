'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled, {keyframes} from 'styled-components';

import resolveArrayLikeObject from '../../Utils/ResolveArrayLikeObject';

const _ = require('lodash');

const StyledCustomer = styled.div`
  width: calc(100% - 50px);
  display: block;
  padding: 25px;
  border: 1px solid #787878;
  margin: 1.5em 0em;
`;

const NoClientsText = styled.h2`
  font-weight: 100;
`;

export default class ClientsOverview extends React.Component {
  constructor() {
    super();

    this.state = {
      customers: []
    }

    _.bindAll(this, '_renderCustomers');
  }

  componentWillMount() {
    this.props.setCurrentPage('My Clients');
    this._getCustomersForUser();
  }

  _getCustomersForUser() {
    this.props.fetcher.getRequestWithToken('/me/customers', this.props.token)
      .then(res => res.json())
      .then((data) => {
        this.setState({customers: data.data});
      })
      .catch((error) => {
        this.setState({customers: [], error: error});
      });
  }

  _renderCustomers() {
    if(this.state.error) return <NoClientsText>No clients found!</NoClientsText>;

    const customers = resolveArrayLikeObject(this.state.customers);
    return this.state.customers.map((customer, i) => {
      return <StyledCustomer key={i}>{customer.first_name}</StyledCustomer>;
    });
  }

  render() {
    return (
      <div>
        {this._renderCustomers()}
      </div>
    );
  }
}
