'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import styled from 'styled-components';

import Title from '../Elements/Title';
import Button from '../Elements/Button';
import Link from '../Elements/Link';
import FlexWrapper from '../Elements/FlexWrapper';

const _ = require('lodash');

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,1);
`;

const Navigation = styled.div`
  height: 15%;
  width: 100%;
`;

const ContentContainer = styled.div`
  margin: 2em auto 6em auto;
  width: calc(90% - 6em);
  min-height: 100%;
  height: auto;
  position: relative;
  padding: 3em;
  background-color: rgb(240, 240, 240);
`;

const NavFlexWrapper = styled(FlexWrapper)`
  position: absolute;
  top: 5%;
  right: 5%;

  @media(max-width: 950px) {
    top: 3%;
    flex-direction: column;
  }
`;

const NavLink = styled(Link)`
  @media(max-width: 950px) {
    display: inline;
    flex-direction: column;
    text-align: right;
    padding: 0.3em 0em;

    &::before {
      display: none;
    }
  }
`;

const DashboardTitle = styled(Title)`
  padding-top: 2%;
  margin-left: 5%;
`;

const DashboardPageTitle = styled.div`
  position: relative;
  font-size: 4em;
  padding: 0em 0em 0em 6em;
  width: calc(90% - 4em);
  text-align: right;
  margin-bottom: 0em !important;
  margin-right: 0em !important;
  display: block;
  font-weight: 100;
  color: #787878;
  font-family: 'Crimson Text', sans-serif;

  @media(max-width: 950px) {
    padding: 0 !important;
    margin: 3em auto 0em auto !important;
    font-size: 2.5em;
    text-align: center !important;
  }
`;

export default class Dashboard extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_logout', '_setCurrentPage', '_getCustomersForUser');

    this.state = { currentPage: 'Rooms', customers: {} }
  }

  _logout() {
    this.props.logout();
  }

  _setCurrentPage(page) {
    this.setState({
      currentPage: page
    });
  }

  componentWillMount() {
    this._getCustomersForUser();
  }

  _getCustomersForUser() {
    const token = this.props.retrieveFromLocalStorage('@TOKEN');
    this.props.fetcher.getRequestWithToken('/me/customers', token)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          customers: data.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const token = this.props.retrieveFromLocalStorage('@TOKEN');
    const username = this.props.retrieveFromLocalStorage('@USERNAME');
    const children = React.cloneElement(this.props.children, {
      key: this.props.location.pathname,
      fetcher: this.props.fetcher,
      token: token,
      logout: this.props.logout,
      setCurrentPage: this._setCurrentPage,
      customers: this.state.customers
    });

    //TODO: Make dashboardpagetitle dynamic and maybe give values from reservation data?
    return(
      <Wrapper>
        <Navigation>
          <DashboardTitle color='#000' fontSize='4em' fontWeight='900'>Dashboard</DashboardTitle>
          <h2 className='dashboard__sub-title'>- Logged in as <span className='dashboard__username'>{username}</span> -</h2>
          <NavFlexWrapper direction='row' width='40%'>
            <NavLink href='#/'>Rooms</NavLink>
            <NavLink href='#/reservations'>My Reservations</NavLink>
            <NavLink>My Clients</NavLink>
            <NavLink onClick={this._logout}>Logout</NavLink>
          </NavFlexWrapper>
        </Navigation>

        <DashboardPageTitle>{this.state.currentPage}</DashboardPageTitle>
        <ContentContainer>
          {children}
        </ContentContainer>
      </Wrapper>
    )
  }
}
