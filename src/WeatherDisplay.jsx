import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import WeatherIcons from 'react-weathericons';

import iconMap from './iconMap';

const WeatherDisplay = ({ temperature, description, descriptionId }) => (
  <Container>
    {/* TODO: icon name selector is unsafe. Wrap in utility function? */}
    <WeatherIcons name={iconMap[descriptionId].icon} size="4x" />
    <div>
      <h1>{temperature.toFixed(1)}&deg;</h1>
      <em>{description}</em>
    </div>
  </Container>
);
WeatherDisplay.propTypes = {
  temperature: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  descriptionId: PropTypes.number.isRequired,
};

const Container = styled.div`
  display: flex;
  padding: 1rem 0 1rem 0; // make room for overflowing icons
  justify-content: center;
  align-items: center;
  & * {
    margin: 5px;
  }
`;

export default WeatherDisplay;
