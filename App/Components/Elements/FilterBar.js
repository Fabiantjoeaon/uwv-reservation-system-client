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
            <FilterLabel for='roomtype'>Room type</FilterLabel>
            <FilterSelect name='roomtype' value={this.props.filters.roomtype ? this.props.filters.roomtype : 'all'} onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='spreekkamer'>Spreekkamer</option>
              <option value='onderzoekkamer'>Onderzoekkamer</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='floor'>Floor</FilterLabel>
            <FilterSelect name='floor' value={this.props.filters.floor ? this.props.filters.floor : 'all'} onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='0'>0</option>
              <option value='1'>1</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='max_persons'>Max persons</FilterLabel>
            <FilterSelect name='max_persons' value={this.props.filters.max_persons ? this.props.filters.max_persons : 'all'} onChange={this._handleChange}>
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
            <FilterSelect name='has_pc' value={this.props.filters.has_pc ? this.props.filters.has_pc : 'all'} onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='1'>PC</option>
              <option value='0'>No PC</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='invalid'>Invalid</FilterLabel>
            <FilterSelect name='invalid' value={this.props.filters.invalid ? this.props.filters.invalid : 'all'} onChange={this._handleChange}>
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
