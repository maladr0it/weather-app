import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import FontAwesome from 'react-fontawesome';

import WeatherDisplay from './WeatherDisplay';
import ForecastDisplay from './ForecastDisplay';

const Report = ({
  locationName, weather, forecast, utcOffset, handleRefresh,
}) => (
  <React.Fragment>
    <h2>{locationName}</h2>
    <Summary>
      <WeatherDisplay {...weather} />
      <IconButton onClick={() => handleRefresh()}>
        <FontAwesome name="sync" />
      </IconButton>
    </Summary>
    <ForecastDisplay periods={forecast} offset={utcOffset} />
  </React.Fragment>
);

// TODO: import shapes across components
Report.propTypes = {
  locationName: PropTypes.string.isRequired,
  weather: PropTypes.shape({
    temperature: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    descriptionId: PropTypes.number.isRequired,
  }).isRequired,
  forecast: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.number.isRequired,
    temperature: PropTypes.number.isRequired,
    descriptionId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  utcOffset: PropTypes.number.isRequired,
  handleRefresh: PropTypes.func.isRequired,
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Summary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s linear;
`;
const IconButton = styled.button`
  border: none;
  font-size: 1rem;
  margin: 0;
  padding: 0;
  color: inherit;
  background: inherit;
  cursor: pointer;
`;

export default Report;
