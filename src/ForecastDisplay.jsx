import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ResponsiveContainer, AreaChart, XAxis, Tooltip, Area } from 'recharts';

import WeatherTooltip from './WeatherTooltip';
import theme from './theme';

const ForecastDisplay = ({ periods, offset }) => {
  const chartData = periods
    // only show the next 24 hours
    .filter(period => period.time < Date.now() + 24 * 60 * 60 * 1000)
    .map(period => ({
      // apply UTC offset to display time local to that region
      hour: new Date(period.time + offset).toISOString().slice(11, 16),
      ...period,
    }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={chartData} margin={{ top: 60 }}>
        <defs>
          <linearGradient id="temperature" x1="0" y1="0" x2="0" y2="1" />
        </defs>
        <XAxis
          dataKey="hour"
          interval="preserveStartEnd"
          tickMargin={10}
          stroke={theme.eggshellBlue}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="temperature"
          stroke={theme.salmon}
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
          <WeatherTooltip {...data} />
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
  border-radius: 5px;
  opacity: 0.8;
  padding: 0 5px 0 5px
  background: ${theme.grayBlue};
  color: white;
`;

export default ForecastDisplay;
