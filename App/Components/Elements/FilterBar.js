'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import update from 'immutability-helper';

const FilterBarWrapper = styled.div`
  width: 80%;
  display: block;
  margin: 4em auto 2.5em auto;
`;

const FilterBarForm = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.span`
  display: inline-block;
`;

const FilterLabel = styled.label`
  color: #787878;
  font-family: sans-serif;
  display: block;
  text-align: center;
  margin-bottom: 0.5em;
`;

const FilterSelect = styled.select`
  color: #787878;
  min-width: 4em;
  background-color: rgba(0,0,0,0);
  text-shadow: 0 0 0 #000;

  &:active {
    outline: none;
  }
`;

export default class FilterBar extends React.Component {
  constructor() {
    super();

    _.bindAll(this, '_handleChange')

  }

  _handleChange(e) {
    // TODO: Dynamic option values
    this.props.filterRoomsByOption(e.target.name, e.target.value);
  }

  render() {
    return (
      <FilterBarWrapper>
        <FilterBarForm>
          <Filter>
            <FilterLabel for='type'>Room type</FilterLabel>
            <FilterSelect name='type' ref='select_1' value={this.props.filters.type ? this.props.filters.type : 'all'} onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='spreekkamer'>Spreekkamer</option>
              <option value='onderzoekkamer'>Onderzoekkamer</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='floor'>Floor</FilterLabel>
            <FilterSelect name='floor' ref='select_2' value={this.props.filters.floor ? this.props.filters.floor : 'all'} onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='0'>0</option>
              <option value='1'>1</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='capacity'>Max persons</FilterLabel>
            <FilterSelect name='capacity' ref='select_3' value={this.props.filters.capacity ? this.props.filters.capacity : 'all'} onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='has_pc'>Has PC</FilterLabel>
            <FilterSelect name='has_pc' ref='select_4' value={this.props.filters.has_pc ? this.props.filters.has_pc : 'all'} onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='1'>PC</option>
              <option value='0'>No PC</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='invalid'>Invalid</FilterLabel>
            <FilterSelect name='invalid' ref='select_5' value={this.props.filters.invalid ? this.props.filters.invalid : 'all'} onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='1'>Invalid</option>
              <option value='0'>None</option>
            </FilterSelect>
          </Filter>
        </FilterBarForm>
      </FilterBarWrapper>
    )
  }
}
