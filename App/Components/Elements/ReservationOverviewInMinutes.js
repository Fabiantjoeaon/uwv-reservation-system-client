'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import resolveArrayLikeObject from '../../Utils/ResolveArrayLikeObject';

const dateFns = require('date-fns');
const _ = require('lodash');

/* ------------------------------ START STYLES ----------------------------- */
const TimePickerWrapper = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
`;

const MinuteOverview = styled.div`
  width: 80%;
  height: 65em;
  margin-left: 8%;
  display: inline-block;
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
  background-color: ${props => props.selected ? 'rgba(120, 120, 120, 0.7)' : props.reserved ? 'rgba(221, 82, 82, 0.5)' : 'rgb(255,255,255)'};
  position: relative;
  &:before {
    content: attr(data-time);
    color: ${props => props.selected ? 'rgba(120, 120, 120, 0.7)' : props.reserved ? 'rgba(221, 82, 82, 0.5)' : 'rgb(255,255,255)'};
    position: absolute;
    display: block;
    width: 10%;
    height: 100%;
    top:0;
    left:-10%;
    transition: all 0.2s ease-out;
  }

  &:hover {
    background-color:rgb(120, 120, 120);
  }

  &:hover::before {
    color: rgb(120, 120, 120);
  }
`;

const CurrentReservationDataWrapper = styled.div`
  position: absolute;
  top: -10%;
  right: 12%;
  text-align: right;
  width: 40%;
  height: 5em;
`;

const TimeIndicator = styled.h3`
  color: #fff;
  font-weight: 100;
`;
/* ------------------------------ END STYLES ----------------------------- */

class QuarterLine extends React.Component {
  constructor() {
    super();

    this.state = {
      reserved: false
    }

    _.bindAll(this, '_handleClick');
  }

  _handleClick() {
    this.props.setCurrentIndex(this.props.index);
  }

  render() {
    return(
      <StyledLine onClick={this._handleClick} data-time={this.props.timeSlot} reserved={this.state.reserved} selected={this.props.selected} totalQuarters={this.props.totalQuarters}/>
    )
  }
}

export default class ReservationOverviewInMinutes extends React.Component {
  constructor() {
    super();

    this.startTime = '8:00';
    this.endTime = '18:00';
    this.timeMultiplier = 15;
    this.startInHours = parseInt(this.startTime.slice(0, -2));
    this.minutesFromStartTime = this.startInHours * 60;
    const totalHours = Math.abs(this.startInHours - parseInt(this.endTime.slice(0, -2)));
    const totalMinutes = totalHours * 60;
    // Add 1 for last time slot
    const quarters = Array((totalHours * 4) + 1);

    this.state = {
      reservations: {},
      quarters: quarters,
      currentIndex: 0,
      startPoint: -1,
      startTime: null,
      endPoint: -1,
      endTime: null,
      activeLines: []
    };

    _.bindAll(this, '_setCurrentIndex', '_fillLines', '_toDate', '_reset');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      reservations: nextProps.reservations
    });
  }

  _setCurrentIndex(index) {
    // First click, set start point
    if(!(this.state.startPoint >= 0 && this.state.endPoint >= 0)) {
      const startTime = eval(`this.refs.line_${index}`).props.timeSlot;
      this.setState({ currentIndex: index, startPoint: index, startTime: startTime });
    }
    // Second click, set start point to click before, and end point to this one
    // TODO: Check if index is before so that you can handle going backwards!
    if (this.state.startPoint >= 0 && !(this.state.endPoint >= 0)) {
      const startTime = eval(`this.refs.line_${this.state.currentIndex}`).props.timeSlot;
      const endTime = eval(`this.refs.line_${index}`).props.timeSlot;

      // If beginpoint is selected first, count lines up
      if(this.state.currentIndex < index) {
        this.setState({
          currentIndex: index,
          startPoint: this.state.currentIndex,
          startTime: startTime,
          endPoint: index,
          endTime: endTime
        }, () => {
          this._fillLines(Math.abs(this.state.startPoint - this.state.endPoint), 'asc');
        });
      } else {
        this.setState({
          currentIndex: index,
          startPoint: index,
          startTime: endTime,
          endPoint: this.state.currentIndex,
          endTime: startTime
        }, () => {
          // console.log(this.state.startPoint, this.state.endPoint);
          this._fillLines(Math.abs(this.state.startPoint - this.state.endPoint), 'desc');
        });
      }
    }
    // Third click, reset
    if (this.state.startPoint >= 0 && this.state.endPoint >= 0){
      this._reset();
    }
  }

  _reset() {
    this.setState({ currentIndex: 0, startPoint: -1, endPoint: -1, startTime: null, endTime: null, activeLines: []});
  }

  _fillLines(numberLines, dir) {
    const activeLines = [];
    switch(dir) {
      case 'asc':
        for(let i = 0; i <= numberLines; i++) {
          const lineIndex = i + this.state.startPoint;
          activeLines.push(lineIndex);
        }
        break;

      case 'desc':
        for(let i = numberLines; i >= 0; i--) {
          console.log(numberLines, i)
          const lineIndex = i + this.state.startPoint;
          activeLines.push(lineIndex);
        }
        break;
    }
    this.setState({
      activeLines: activeLines
    });
  }

  _toDate(dateStr) {
    const parts = dateStr.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2], this.startInHours);
  }

  render() {
    const reservations = resolveArrayLikeObject(this.state.reservations);
    const quarters = resolveArrayLikeObject(this.state.quarters);
    const date = this._toDate(this.props.date);

    return (
      <TimePickerWrapper>
        <CurrentReservationDataWrapper>
          {!(this.state.startPoint == -1) ? <TimeIndicator>Start time: {this.state.startTime}</TimeIndicator> : null}
          {!(this.state.endPoint == -1) ? <TimeIndicator>End time: {this.state.endTime}</TimeIndicator> : null}
        </CurrentReservationDataWrapper>
        <MinuteOverview>
          {quarters.map((quarter, i) => {
            //TODO: Move this to renderLines function
            const addedTime = dateFns.addMinutes(date, (i * this.timeMultiplier));
            const addedInminutes = addedTime.getMinutes();
            const minutes = addedInminutes < 10 ? `0${addedInminutes}` : addedInminutes;
            const timeSlot = `${addedTime.getHours()}:${minutes}`;

            if(!(_.indexOf(this.state.activeLines, i) == -1)) {
              return <QuarterLine
                        key={i}
                        index={i}
                        selected={true}
                        timeSlot={timeSlot}
                        ref={`line_${i}`}
                        setCurrentIndex={this._setCurrentIndex}
                        currentIndex={this.state.currentIndex}
                        totalQuarters={quarters.length}/>
            } else {
              return <QuarterLine
                        key={i}
                        index={i}
                        selected={false}
                        timeSlot={timeSlot}
                        ref={`line_${i}`}
                        setCurrentIndex={this._setCurrentIndex}
                        currentIndex={this.state.currentIndex}
                        totalQuarters={quarters.length}/>
            }
          })}
        </MinuteOverview>
      </TimePickerWrapper>
    )
  }
}
