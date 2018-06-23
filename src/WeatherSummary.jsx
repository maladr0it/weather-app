import React from 'react';
import styled from 'styled-components';
import WeatherIcons from 'react-weathericons';

import theme from './theme';
import iconMap from './iconMap';

const WeatherSummary = ({ temperature, description, descriptionId }) => (
  <React.Fragment>
    <Hero>
      <Icon>
        <WeatherIcons name={iconMap[descriptionId].icon} size="4x" />
      </Icon>
      <Temperature>{temperature.toFixed(1)}&deg;</Temperature>
    </Hero>
    <Description>{description}</Description>
  </React.Fragment>
);

const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Temperature = styled.h1`
  margin: 0;
  font-size: 6rem;
`;
const Icon = styled.span`
  color: ${theme.salmon};
  margin-right: 1rem;
`;

const Description = styled.div`
  text-align: center;
`;

export default WeatherSummary;
