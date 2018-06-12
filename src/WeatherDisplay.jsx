import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WeatherIcons from 'react-weathericons';

import iconMap from './iconMap';
import theme from './theme';

const WeatherDisplay = ({ temperature, description, descriptionId }) => (
  <React.Fragment>
    <Summary>
      <h1>{Math.round(temperature).toFixed(1)}&deg;</h1>
      <WeatherIcons name={iconMap[descriptionId].icon} size="4x" />
    </Summary>
    <em>{description}</em>
  </React.Fragment>
);
WeatherDisplay.propTypes = {
  temperature: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  descriptionId: PropTypes.number.isRequired,
};

const Summary = styled.div`
  overflow: true;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default WeatherDisplay;
