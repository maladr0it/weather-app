import React from 'react';
import styled from 'styled-components';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts';

import WeatherDisplay from './WeatherDisplay';
import theme from './theme';

const ForecastDisplay = ({ periods, offset }) => {
  const data = periods
    // only show the next 24 hours
    .filter(period => period.time < Date.now() + 24 * 60 * 60 * 1000)
    .map(period => ({
      // apply UTC offset to get the local time
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

const CustomTooltip = ({ label, payload }) => {
  const data = payload[0] && payload[0].payload;
  return (
    <React.Fragment>
      {/* must return null, as it cannot be unmounted */}
      {null}
      {data && (
        <TooltipContainer>
          <h3>{label}</h3>

          <WeatherDisplay {...data} />
        </TooltipContainer>
        // <TooltipContainer>
        //   <h3>{data.hour}</h3>
        //   <p>{data.temperature}&deg;</p>
        // </TooltipContainer>
      )}
    </React.Fragment>
  );
};

const TooltipContainer = styled.div`
  opacity: 0.8;
  background: ${theme.strongPink};
  color: ${theme.offWhite};
`;

export default ForecastDisplay;
