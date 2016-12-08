'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const _ = require('lodash');

import Input from './Input';
import Title from './Title';
import Button from './Button';
import Notice from './Notice';
import TimePicker from './TimePicker';
import resolveArrayLikeObject from '../../Utils/ResolveArrayLikeObject';

const ReservationFormTitle = styled(Title)`
  margin-top: 0.5em;
  width: 100%;
  display: block;
  font-size: 5.3em;
`;

const ReservationForm = styled.form`
  margin: 6em auto 4em auto;
`;

const ReservationFormDivider = styled.div`
  width: 50%;
  display: inline-block;
  vertical-align:top;

  @media(max-width: 950px) {
    display: block;
    width: 100%;
  }
`;

const CustomerOptionWrapper = styled.div`
  margin-bottom: 5em;
  display: block;
`;

const CustomerLabel = styled.label`
  color: #fff;
  font-family: sans-serif;
  font-weight: 100;
  font-size: 1.8em;
  display: inline-block;
  margin-left: 1.5em;
  cursor: pointer;

  &:before {
     content: '';
     display: inline-block;
     width: 15px;
     height: 15px;
     position: absolute;
     left: 0;
     bottom: 1px;
     border: 2px solid #fff;
     border-radius: 50%;
     cursor: pointer;
     background-color: rgba(0,0,0,0);
     transition: all 0.2s ease-out;
  }

  &:after {
    content: '';

    height: 1px;
    display: inline-block;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const CustomerItem = styled.span`
  display: block;
  position: relative;
  margin: 2em 0em;

  > input[type='radio']:checked + label:before {
    background-color: #fff;
  }
`;

const CustomerOption = styled.input`
  display: none;
`;

export default class RoomReservationForm extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_handleSubmit', '_getReservationsForDate', '_filterRoomsById', '_showCustomerForm');

    this.state = { isLoading: false, addCustomer: false, reservations: {}, customers: {} };
  }

  componentWillMount() {
    this._getReservationsForDate();
  }

  _filterRoomsById(reservations) {
    const filteredReservations = reservations.filter((res) => {
      return this.props.roomId == res.room_id;
    });

    return filteredReservations;
  }

  _getReservationsForDate() {
    this.setState({
      isLoading: true
    });
    this.props.fetcher.getRequestWithToken(`/reservations/date/${this.props.date}`, this.props.token)
      .then(res => res.json())
      .then((data) => {
        const reservations = [];
        data.data.map((reservation) => {
          reservations.push(reservation);
        });
        this.setState({
          reservations: this._filterRoomsById([].concat(...reservations)),
          isLoading: false
        });
      })
      .catch((error) => {
        this.setState({
          reservations: {},
          isLoading: false
        })
      });
  }

  _handleSubmit(e) {
    const data = {};
  }

  _showCustomerForm(e) {
    this.setState({
      addCustomer: e.target.value == 'on' ? 1 : 0
    });
  }

  _renderCustomersSelect() {
    const customers = resolveArrayLikeObject(this.props.customers);
    const customerOptions = customers.map((customer, i) => {
      const {id, first_name, last_name} = customer;
      return (
        <CustomerItem key={i}>
          <CustomerOption type='radio' id={`customer-${id}`} name='customer-option' value={id} onClick={(e) => {this._showCustomerForm(e)}} />
          <CustomerLabel htmlFor={`customer-${id}`}>{first_name} {last_name}</CustomerLabel>
        </CustomerItem>
      );
    });
    return customerOptions;
  }

  render() {
    const className = `res-form__${this.props.room.type}`;
    // Color label of input based on room type
    const inputColor = this.props.room.type == 'Onderzoekkamer' ? '#b5d0ff' : '#C4B7FF';
    // Get customers, if there are none show notice
    const customerList = typeof this.props.customers == 'object' && !this.props.customers.length == 0 ?
      this._renderCustomersSelect() :
      <h3 className='res-form__text'>No customers found</h3>;

    return (
      <div className={className}>
        <ReservationFormTitle color='#fff' fontSize='4em'>{this.props.room.name}</ReservationFormTitle>
        <ReservationForm onSubmit={this._handleSubmit}>
          <ReservationFormDivider dir='left'>
            <CustomerOptionWrapper>
              <h2 className='res-form__title'>Customer for reservation:</h2>
              {customerList}
              <CustomerItem>
                <CustomerOption id='customer-add' type='radio' name='customer-option' onClick={(e) => {this._showCustomerForm(e)}} />
                <CustomerLabel htmlFor='customer-add'>Add a customer</CustomerLabel>
              </CustomerItem>
            </CustomerOptionWrapper>
            {this.state.addCustomer ?
              <div>
                <Input color='#fff' ref='first_name' secondColor={inputColor} name='first_name' type='text' label='Customers first name' />
                <Input color='#fff' ref='last_name' secondColor={inputColor} name='last_name' type='text' label='Customers last name' />
                <Input color='#fff' ref='email' secondColor={inputColor} name='email' type='text' label='Customers E-mail' />
                <Input color='#fff' ref='bsn' secondColor={inputColor} name='bsn' type='text' label='Customers BSN' />
              </div>
               : null}
              <h2 className='res-form__title'>Reservation data:</h2>
              <Input color='#fff' secondColor={inputColor} name='activity' ref='activity' type='text' label='Activity' />
              <Input color='#fff' secondColor={inputColor} name='description' ref='description' type='text' label='Description' />
          </ReservationFormDivider>

          <ReservationFormDivider dir='right'>
            <h2 className='res-form__title'>Pick a time:</h2>
            <TimePicker date={this.props.date} type={this.props.type} reservations={this.state.reservations}/>
          </ReservationFormDivider>
        </ReservationForm>
      </div>
    )
  }
}
