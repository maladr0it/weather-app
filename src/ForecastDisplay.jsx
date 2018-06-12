import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';

import WeatherDisplay from './WeatherDisplay';
import theme from './theme';

const ForecastDisplay = ({ periods, offset }) => {
  console.log(periods);

  const data = periods
    // only show the next 24 hours
    .filter(period => period.time < Date.now() + 24 * 60 * 60 * 1000)
    .map(period => ({
      // apply UTC offset to display time local to that region
      hour: new Date(period.time + offset).toISOString().slice(11, 16),
      ...period,
    }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="temperature" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={theme.strongPink} stopOpacity={0.8} />
            <stop offset="95%" stopColor={theme.strongPink} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="hour" interval="preserveStartEnd" />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="temperature"
          stroke={theme.strongPink}
          fillOpacity={1}
          fill="url(#temperature)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const periodShape = PropTypes.shape({
  time: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
  descriptionId: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
});

ForecastDisplay.propTypes = {
  periods: PropTypes.arrayOf(periodShape).isRequired,
  offset: PropTypes.number.isRequired,
};

const CustomTooltip = ({ payload }) => {
  const data = payload[0] && payload[0].payload;
  return (
    <React.Fragment>
      {/* must return null, as it cannot be unmounted */}
      {null}
      {data && (
        <TooltipContainer>
          <WeatherDisplay {...data} />
        </TooltipContainer>
      )}
    </React.Fragment>
  );
};

CustomTooltip.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({
    payload: periodShape,
  })),
};
CustomTooltip.defaultProps = {
  payload: null,
};

const TooltipContainer = styled.div`
  opacity: 0.8;
  padding: 0 5px 0 5px
  background: ${theme.gray27};
  color: ${theme.offWhite};
`;

export default ForecastDisplay;
