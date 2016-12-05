'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const FilterBarWrapper = styled.div`
  width: 100%;
  display: block;
  margin: 4em 0em 2.5em 0em;
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
  }

  _handleChange(e) {
    console.log('Selected: ', e.target.value);

    // TODO: Gather values in object and pass to parent function (this.props) that sets state ( roomoverview)
    // TODO: Dynamic option values
  }

  render() {
    return (
      <FilterBarWrapper>
        <FilterBarForm>
          <Filter>
            <FilterLabel for='roomtype'>Room type</FilterLabel>
            <FilterSelect name='roomtype' defaultValue='all' onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='spreekkamer'>Spreekkamer</option>
              <option value='onderzoekkamer'>Onderzoekkamer</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='floor'>Floor</FilterLabel>
            <FilterSelect name='floor' defaultValue='all' onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='0'>0</option>
              <option value='1'>1</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='max-persons'>Max persons</FilterLabel>
            <FilterSelect name='max-persons' defaultValue='all' onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='color'>Color</FilterLabel>
            <FilterSelect name='color' defaultValue='all' onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='paars'>Paars</option>
              <option value='oranje'>Oranje</option>
              <option value='groen'>Groen</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='has-pc'>Has PC</FilterLabel>
            <FilterSelect name='has-pc' defaultValue='all' onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='1'>PC</option>
              <option value='0'>No PC</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='invalid'>Invalid</FilterLabel>
            <FilterSelect name='invalid' defaultValue='all' onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='1'>Invalid</option>
              <option value='0'>None</option>
            </FilterSelect>
          </Filter>
          <Filter>
            <FilterLabel for='is_reserved_now'>Reserved now</FilterLabel>
            <FilterSelect name='is_reserved_now' defaultValue='all' onChange={this._handleChange}>
              <option value='all'>All</option>
              <option value='1'>Yes</option>
              <option value='0'>No</option>
            </FilterSelect>
          </Filter>
        </FilterBarForm>
      </FilterBarWrapper>
    )
  }
}
