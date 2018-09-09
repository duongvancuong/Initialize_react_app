/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import LoadingSpinner from "./index";
storiesOf('LoadingSpinner', module)
  .add('with text', () => (
      <LoadingSpinner />
  ));
