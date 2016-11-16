'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const TweenMax = require('gsap');

const StyledNotice = styled.span`
  background-color: ${props => props.type = 'error' ? 'rgb(219, 100, 73)' : 'rgb(213, 206, 47)'};
  padding: 10px 20px;
  text-align: center;
  font-family: 'Questrial', sans-serif;
  margin: 0.5em 0em;
  opacity: 0;
  color: #fff;
  transition: opacity 0.3s ease-out;
`;

class Notice extends React.Component {
  constructor() {
    super();
  }

  componentWillEnter(callback) {
    const node = ReactDOM.findDOMNode(this);
    TweenMax.to(node, 0.3, {ease: Power2.easeInOut, opacity: 1}).eventCallback('onComplete', callback);
  }

  render() {
    const {notice} = this.props;
    return (
      <StyledNotice>{notice}</StyledNotice>
    );
  }
}

export default Notice;
