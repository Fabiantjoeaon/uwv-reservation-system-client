'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import resolveArrayLikeObject from '../../Utils/ResolveArrayLikeObject';

const _ = require('lodash');

const MinuteOverview = styled.div`
  width: 80%;
  height: 65em;
  position: relative;
  background-color: #fff;
`;

const StyledLine = styled.span`
  display: block;
  height: calc(65em / ${props => props.totalQuarters});
  box-sizing: border-box;
  border-bottom: 1px solid rgba(222, 222, 222, 0.7);
  transition: 0.2s ease-out;
  cursor: pointer;
  background-color: ${props => props.selected ? 'rgba(222,222,222, 0.7)' : props.reserved ? 'rgba(221, 82, 82, 0.5)' : 'rgb(255,255,255)'};
  &:hover {
    background-color:rgb(222, 222, 222);
  }
`;

class QuarterLine extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: false,
      reserved: false
    }

    _.bindAll(this, '_handleClick');
  }

  _handleClick() {
    console.log(this.props.index, this.props.currentIndex)
    this.props.setCurrentIndex(this.props.index);
  }

  render() {
    return(
      <StyledLine onClick={this._handleClick} reserved={this.state.reserved} selected={this.props.selected} totalQuarters={this.props.totalQuarters}/>
    )
  }
}

export default class ReservationOverviewInMinutes extends React.Component {
  constructor() {
    super();

    this.startTime = '8:00';
    this.endTime = '18:00';
    this.totalHours = Math.abs(parseInt(this.startTime.slice(0, -2)) - parseInt(this.endTime.slice(0, -2)));
    this.totalMinutes = this.totalHours * 60;
    this.quarters = Array(this.totalHours * 4);
    this.state = {
      reservations: {},
      startTime: this.startTime,
      endTime: this.endTime,
      totalHours: this.totalHours,
      totalMinutes: this.totalHours,
      quarters: this.quarters,
      currentIndex: 0,
      startPoint: -1,
      endPoint: -1,
      activeLines: []
    };

    _.bindAll(this, '_setCurrentIndex', '_fillLines');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      reservations: nextProps.reservations
    });
  }

  _setCurrentIndex(index) {
    // First click, set start point
    if(!(this.state.startPoint >= 0 && this.state.endPoint >= 0)) {
      this.setState({ currentIndex: index, startPoint: index });
    }
    // Second click, set start point to click before, and end point to this one
    if (this.state.startPoint >= 0 && !(this.state.endPoint >= 0)) {
      this.setState({ currentIndex: index, startPoint: this.state.currentIndex, endPoint: index }, () => {
        this._fillLines(Math.abs(this.state.startPoint - this.state.endPoint));
      });
    }
    // Third click, reset
    if (this.state.startPoint >= 0 && this.state.endPoint >= 0){
      console.log('reset');
      this.setState({ currentIndex: index, startPoint: -1, endPoint: -1, activeLines: []});
    }
  }

  _fillLines(numberLines) {
    const activeLines = [];
    for(let i = 0; i <= numberLines; i++) {
      const lineIndex = i + this.state.startPoint;
      activeLines.push(lineIndex);
    }
    this.setState({
      activeLines: activeLines
    }, () => {
      console.log('active lines: ', this.state.activeLines)
    });
  }

  render() {
    const reservations = resolveArrayLikeObject(this.state.reservations);
    const quarters = resolveArrayLikeObject(this.state.quarters);
    console.log('index: ', _.indexOf(this.state.activeLines, 3));
    return (
      <MinuteOverview>
        {quarters.map((quarter, i) => {
          if(!(_.indexOf(this.state.activeLines, i) == -1)) {
            return <QuarterLine
                      key={i}
                      index={i}
                      selected={true}
                      ref={`line_${i}`}
                      setCurrentIndex={this._setCurrentIndex}
                      currentIndex={this.state.currentIndex}
                      totalQuarters={quarters.length}/>
          } else {
            return <QuarterLine
                      key={i}
                      index={i}
                      selected={false}
                      ref={`line_${i}`}
                      setCurrentIndex={this._setCurrentIndex}
                      currentIndex={this.state.currentIndex}
                      totalQuarters={quarters.length}/>
          }
        })}
      </MinuteOverview>
    )
  }
}
