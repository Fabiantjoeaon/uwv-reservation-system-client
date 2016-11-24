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
  transform: translateY(-120vh);
`;

const Navigation = styled.div`
  height: 15%;
  width: 100%;
`;

const ContentContainer = styled.div`
  margin: 15em auto 6em auto;
  width: calc(90% - 6em);
  min-height: 100%;
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
  padding-top: 3%;
  margin-left: 5%;
`;

export default class Dashboard extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_logout');
  }

  _logout() {
    this.props.logout();
  }

  componentWillEnter(callback) {
    const node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 1, {delay: 0.7, ease: Power2.easeOut, y: 0}).eventCallback('onComplete', callback);
  }

  componentWillAppear(callback) {
    const node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 0.5, {delay: 0.7, ease: Power2.easeOut, y: 0}).eventCallback('onComplete', callback);
  }

  componentWillLeave(callback) {
    const node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 0.5, {delay: 0.3, ease: Power2.easeOut, y: -1000}).eventCallback('onComplete', callback);
  }

  render() {
    const token = this.props.retrieveFromLocalStorage('@TOKEN');
    const username = this.props.retrieveFromLocalStorage('@USERNAME');
    const children = React.cloneElement(this.props.children, {
      key: this.props.location.pathname,
      fetcher: this.props.fetcher,
      token: token,
      logout: this.props.logout
    });

    return(
      <Wrapper>
        <Navigation>
          <DashboardTitle fontSize='4em' fontWeight='900'>Dashboard</DashboardTitle>
          <h2 className='dashboard__sub-title'>- Logged in as <span className='dashboard__username'>{username}</span> -</h2>
          <NavFlexWrapper direction='row' width='40%'>
            <NavLink href='#/'>Rooms</NavLink>
            <NavLink href='#/reservations'>My Reservations</NavLink>
            <NavLink>My Clients</NavLink>
            <NavLink onClick={this._logout}>Logout</NavLink>
          </NavFlexWrapper>
        </Navigation>
        <TransitionGroup>
          <ContentContainer>
            {children}
          </ContentContainer>
        </TransitionGroup>
      </Wrapper>
    )
  }
}
