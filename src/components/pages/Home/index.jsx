import React, { Component } from 'react';
import styled from 'styled-components';

import { GridContainer, GridColumn, GridRow} from '../../../styles/layout/_grid';

const Text = styled.p`
  text-align: center;
`;
export default class Home extends Component {
  render() {
    return (
      <GridContainer>
        <GridRow>
          <GridColumn md='6' sm='12'>
            <Text>md-6 sm-12</Text>
          </GridColumn>
          <GridColumn md='6' sm='12'>
            <Text>md-6 sm-12</Text>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn md='4' sm='12'>
            <Text>md-4 sm-12</Text>
          </GridColumn>
          <GridColumn md='4' sm='12'>
            <Text>md-4 sm-12</Text>
          </GridColumn>
          <GridColumn md='4' sm='12'>
            <Text>md-4 sm-12</Text>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn md='3' sm='6'>
            <Text>md-3 sm-6</Text>
          </GridColumn>
          <GridColumn md='3' sm='6'>
            <Text>md-3 sm-6</Text>
          </GridColumn>
          <GridColumn md='3' sm='6'>
            <Text>md-3 sm-6</Text>
          </GridColumn>
          <GridColumn md='3' sm='6'>
            <Text>md-3 sm-6</Text>
          </GridColumn>
        </GridRow>
      </GridContainer>
    );
  }
}
