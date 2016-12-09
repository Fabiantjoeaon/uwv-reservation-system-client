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
  height: auto;
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
  padding: 5px 0px;
  border-top: 1px solid rgba(222, 222, 222, 0.7);
  transition: 0.2s ease-out;
  cursor: pointer;
  background-color: ${props => props.selected ? 'rgba(120, 120, 120, 0.7)' : props.reserved ? 'rgba(221, 82, 82, 0.7)' : 'rgb(255,255,255)'};
  position: relative;
  &:before {
    content: attr(data-time);
    color: ${props => props.selected ? 'rgba(120, 120, 120, 0.7)' : props.reserved ? 'rgba(221, 82, 82, 0.7)' : 'rgb(255,255,255)'};
    position: absolute;
    font-weight: ${props => props.hour ? 900 : 100};
    display: block;
    width: 10%;
    height: 100%;
    top:0;
    text-align: right;
    left:-15%;
    transition: all 0.2s ease-out;
  }

  &:hover {
    background-color:${props => props.reserved ? 'rgb(221,82,82)' : 'rgb(120, 120, 120)'}
  }

  &:hover::before {
    color: ${props => props.reserved ? 'rgb(221,82,82)' : 'rgb(120, 120, 120)'}
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

    _.bindAll(this, '_handleClick');

    this.hour = false;
  }

  _handleClick() {
    if(this.props.reserved) return;
    this.props.setCurrentIndex(this.props.index);
  }

  render() {
    const {timeSlot, reserved, selected, totalQuarters, reservations} = this.props;
    this.hour = timeSlot.indexOf('00') !== -1 ? 1 : 0;
    return(
      <StyledLine onClick={this._handleClick} hour={this.hour} data-time={timeSlot} reserved={reserved} selected={selected} totalQuarters={totalQuarters}/>
    )
  }
}

// Set up start times and times of reservations, and check if every line falls in between these times (maybe to epoch for easy calcs)
export default class TimePicker extends React.Component {
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

    _.bindAll(this, '_setCurrentIndex', '_fillLines', '_checkIfLineIsReserved',
    '_checkReservedLinesForFilling', '_toDate', '_makeHoursAndMinutes', '_reset');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      reservations: nextProps.reservations
    });
  }

  _setCurrentIndex(index) {
    // Click 1: set start point
    if(!(this.state.startPoint >= 0 && this.state.endPoint >= 0)) {
      const startTime = eval(`this.refs.line_${index}`).props.timeSlot;
      this.setState({ currentIndex: index, startPoint: index, startTime: startTime });
    }
    // Click 2: set start point to click before, and end point to this one
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
      // Endpoint is selected first, count lines down
      } else {
        this.setState({
          currentIndex: index,
          startPoint: index,
          startTime: endTime,
          endPoint: this.state.currentIndex,
          endTime: startTime
        }, () => {
          this._fillLines(Math.abs(this.state.startPoint - this.state.endPoint), 'desc');
        });
      }
    }
    // Click 3: reset
    if (this.state.startPoint >= 0 && this.state.endPoint >= 0){
      this._reset();
    }
  }

  _reset() {
    this.setState({ currentIndex: 0, startPoint: -1, endPoint: -1, startTime: null, endTime: null, activeLines: []});
  }

  _checkReservedLinesForFilling(i) {
    return eval(`this.refs.line_${i}`).props.reserved;
  }

  _fillLines(numberLines, dir) {
    const activeLines = [];
    switch(dir) {
      case 'asc':
        for(let i = 0; i <= numberLines; i++) {
          const lineIndex = i + this.state.startPoint;
          if(this._checkReservedLinesForFilling(lineIndex)) {
            this._reset();
            return;
          } else {
            activeLines.push(lineIndex);
          }
        }
        break;

      case 'desc':
        for(let i = numberLines; i >= 0; i--) {
          const lineIndex = i + this.state.startPoint;
          if(this._checkReservedLinesForFilling(lineIndex)) {
            this._reset();
            return;
          } else {
            activeLines.push(lineIndex);
          }
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

  _makeHoursAndMinutes(time) {
    const timeObj = new Date(time);
    const minutesWithoutZero = timeObj.getMinutes();
    const minutes = minutesWithoutZero < 10 ? `0${minutesWithoutZero}` : minutesWithoutZero;
    const hours = timeObj.getHours();
    const string = `${hours}:${minutes}`;

    return string;
  }

  _returnReservationTimes(reservations) {
    const resolvedReservations = resolveArrayLikeObject(reservations);
    const reservationTimesArray = [];
    resolvedReservations.map((res, i) => {
      const reservationTimes = {
        id: i,
        activity: res.activity,
        startTime: this._makeHoursAndMinutes(res.start_date_time),
        endTime: this._makeHoursAndMinutes(res.end_date_time)
      }
      reservationTimesArray.push(reservationTimes);
    });
    return reservationTimesArray;
  }


  _checkIfLineIsReserved(reservations, timeSlot) {
    if(!reservations) return;
    let reserved =  false;
    reservations.map((res) => {
      const startInt = parseInt(res.startTime.replace(':', ''));
      const endInt = parseInt(res.endTime.replace(':', ''));
      const timeSlotInt = parseInt(timeSlot.replace(':', ''));

      if(timeSlotInt >= startInt  && timeSlotInt <= endInt) {
        reserved = true;
      }
    });

    return reserved;
  }

  render() {
    const quarters = resolveArrayLikeObject(this.state.quarters);
    const date = this._toDate(this.props.date);
    const reservations = this._returnReservationTimes(this.props.reservations);

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
            const timeSlot = this._makeHoursAndMinutes(addedTime);
            const isReserved = this._checkIfLineIsReserved(reservations, timeSlot)
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
                        reservations={reservations}
                        selected={false}
                        timeSlot={timeSlot}
                        ref={`line_${i}`}
                        reserved={isReserved}
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
