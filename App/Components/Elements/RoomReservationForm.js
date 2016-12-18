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
import {makeHoursAndMinutes} from '../../Utils/DateUtils';

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

const ReservationSubmitButton = styled(Button)`
  display: block;
  margin: 3em auto 0em auto;

  &:hover {
    color: ${props => props.type == 'Onderzoekkamer' ? '#b5d0ff !important' : '#C4B7FF !important'};
  }
`;


export default class RoomReservationForm extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_handleSubmit', '_getReservationsForDate', '_filterRoomsById', '_setReservationTimes', '_showCustomerForm');

    this.state = {
      isLoading: false,
      addCustomer: false,
      customerId: null,
      reservations: {},
      errors: {},
      customers: {},
      startTime: '',
      endTime: '',
      activity: '',
      description: '',
      number_persons: 0
    };
  }

  componentWillMount() {
    this._getReservationsForDate();
  }

  componentDidMount() {
    if(this.props.router.location.query.reservation) {
      const id = this.props.router.location.query.reservation;
      this.props.fetcher.getRequestWithToken(`/reservations/${id}`, this.props.token)
        .then((res) => res.json())
        .then((data) => {
          const reservation = data.data;
          //TODO: Set start and end time
          this.setState({
            reservations: [reservation],
            customerId: reservation.customer.id,
            number_persons: reservation.number_persons,
            activity: reservation.activity,
            description: reservation.description
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  _collectReservationData(id = this.state.customerId) {
    // FIXME: length minutes in time!
    const reservationData = {
      start_date_time: `${this.props.date} ${this.state.startTime}:00`,
      length_minutes: Math.abs(parseInt(this.state.startTime.replace(':', '')) - parseInt(this.state.endTime.replace(':', ''))),
      end_date_time: `${this.props.date} ${this.state.endTime}:00`,
      activity: ReactDOM.findDOMNode(this.refs.activity).children.activity.value || ReactDOM.findDOMNode(this.refs.activity).children.activity.placeholder,
      description: ReactDOM.findDOMNode(this.refs.description).children.description.value || ReactDOM.findDOMNode(this.refs.description).children.description.placeholder,
      number_persons: ReactDOM.findDOMNode(this.refs.number_persons).children.number_persons.value || ReactDOM.findDOMNode(this.refs.number_persons).children.number_persons.placeholder,
      customer_id: id,
      room_id: this.props.room.id
    };

    return reservationData;
  }

  _handleSubmit(e) {
    e.preventDefault();
    if(!this.state.addCustomer) {
      const reservationData = this._collectReservationData();
      if(this.props.router.location.query.reservation) {
        this._editReservation(reservationData);
      } else {
        this._postReservation(reservationData);
      }
    } else {
      const customerData = {
        first_name: ReactDOM.findDOMNode(this.refs.first_name).children.first_name.value,
        last_name: ReactDOM.findDOMNode(this.refs.last_name).children.last_name.value,
        email: ReactDOM.findDOMNode(this.refs.email).children.email.value,
        BSN: ReactDOM.findDOMNode(this.refs.BSN).children.BSN.value
      }

      this._postCustomer(customerData);
    }
  }

  _handleErrors(errors) {
    this.setState({errors: errors}, () => {console.log(this.state.errors)});
  }

  _postReservation(data) {
    console.log(data);
    this.props.fetcher.postRequestWithToken('/reservations', this.props.token, data)
      .then((res) => {
        if(res.status === 400) {
          Promise.resolve(res.json()).then((data) => {
            this._handleErrors(data.data);
          });
        }
        if(res.status === 200) {
          Promise.resolve(res.json()).then((data) => {
            this.props.router.push(`/reservations?new=${data.id}`);
          });
        }
      })
      .catch((error) => console.log(error));
  }

  _postCustomer(customerData, reservationData) {
    this.props.fetcher.postRequestWithToken('/customers', this.props.token, customerData)
      .then((res) => {
        if(res.status === 400) {
          Promise.resolve(res.json()).then((data) => {
            this._handleErrors(data.data);
          });
        }
        if(res.status === 200) {
          Promise.resolve(res.json()).then((data) => {
            const reservationData = this._collectReservationData(data.customer_id);
            this._postReservation(reservationData);
          });
        }
      })
      .catch((error) => console.log(error));
  }

  _editReservation(data) {
    console.log(data);
  }

  _showCustomerForm(e) {
    this.setState({
      addCustomer: e.target.value == 'on' ? 1 : 0
    });
  }

  _setReservationTimes(start, end) {
    this.setState({startTime: start, endTime: end});
  }

  _setExistingCustomer(id) {
    this.setState({customerId: id});
  }

  _renderCustomersSelect() {
    const customers = resolveArrayLikeObject(this.props.customers);
    const customerOptions = customers.map((customer, i) => {
      const {id, first_name, last_name} = customer;

      return (
        <CustomerItem key={i}>
          <CustomerOption type='radio' id={`customer-${id}`} checked={this.state.customerId == id} name='customer-option' value={id} onClick={(e) => {this._showCustomerForm(e)}} />
          <CustomerLabel htmlFor={`customer-${id}`} onClick={(e) => {this._setExistingCustomer(id)}}>{first_name} {last_name}</CustomerLabel>
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

    const {errors} = this.state;
    return (
      <div className={className}>
        <ReservationFormTitle color='#fff' fontSize='4em'>{this.props.room.name}</ReservationFormTitle>
        <h2 className='res-form__date'>Reservation on {this.props.date}</h2>
        {this.state.error ? <Notice key='notice' type='error' notice={this.state.error}/> : null}

        <ReservationForm onSubmit={this._handleSubmit}>
          <ReservationFormDivider dir='left'>
            <CustomerOptionWrapper>
              <h2 className='res-form__title'>Customer for reservation:</h2>
              {customerList}
              <CustomerItem>
                <CustomerOption id='customer-add' type='radio' name='customer-option' onClick={(e) => {this._showCustomerForm(e)}} />
                <CustomerLabel htmlFor='customer-add' onClick={(e) => {this._setExistingCustomer(null)}}>Add a customer</CustomerLabel>
              </CustomerItem>
            </CustomerOptionWrapper>
            {this.state.addCustomer ?
              <div>
                <Input color='#fff' ref='first_name' secondColor={inputColor} error={errors.first_name ? errors.first_name : null} name='first_name' type='text' label='Customers first name' />
                <Input color='#fff' ref='last_name' secondColor={inputColor} error={errors.last_name ? errors.last_name : null} name='last_name' type='text' label='Customers last name' />
                <Input color='#fff' ref='email' secondColor={inputColor} error={errors.email ? errors.email : null} name='email' type='text' label='Customers E-mail' />
                <Input color='#fff' ref='BSN' secondColor={inputColor} error={errors.BSN ? errors.BSN : null} name='BSN' type='text' label='Customers BSN' />
              </div>
               : null}
              <h2 className='res-form__title'>Reservation data:</h2>
              <Input color='#fff' secondColor={inputColor} name='number_persons' ref='number_persons' placeholder={this.state.number_persons} type='number' max={this.props.room.capacity} label={`Number of persons (max ${this.props.room.capacity})`} />
              <Input color='#fff' secondColor={inputColor} error={errors.activity ? errors.activity : null} placeholder={this.state.activity} name='activity' ref='activity' type='text' label='Activity' />
              <Input color='#fff' secondColor={inputColor} error={errors.activity ? errors.description : null} placeholder={this.state.description} name='description' ref='description' type='text' label='Description' />
          </ReservationFormDivider>

          <ReservationFormDivider dir='right'>
            <h2 className='res-form__title'>Pick a time:</h2>
            <TimePicker
              editReservationId={this.props.router.location.query.reservation}
              date={this.props.date}
              type={this.props.type}
              setReservationTimes={this._setReservationTimes}
              reservations={this.state.reservations}/>
          </ReservationFormDivider>

          <ReservationSubmitButton
            name='submit'
            type='submit'
            width='75%'
            height='4em'
            fontSize='1.7em'
            type={this.props.room.type}
            color='#fff'>{this.props.router.location.query.reservation ? 'Edit reservation' : 'Submit reservation'}</ReservationSubmitButton>
        </ReservationForm>
      </div>
    )
  }
}
