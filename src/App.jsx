import React, { Component } from 'react';
import styled from 'styled-components';

import {
  getLatLngFromPlaceId,
  getWeatherFromLatLng,
  getForecastFromLatLng,
  getUTCOffsetFromLatLng,
} from './api';
import CityAutoComplete from './CityAutoComplete';
import WeatherDisplay from './WeatherDisplay';
import ForecastDisplay from './ForecastDisplay';
import theme from './theme';

class App extends Component {
  state = {
    loaded: false,
    weather: null,
    forecast: null,
    utcOffset: 0,
  };
  handleCitySelected = async (placeId) => {
    const { lat, lng } = await getLatLngFromPlaceId(placeId);
    // load in parallel
    const [weather, forecast, utcOffset] = await Promise.all([
      getWeatherFromLatLng(lat, lng),
      getForecastFromLatLng(lat, lng),
      getUTCOffsetFromLatLng(lat, lng),
    ]);
    this.setState({
      loaded: true,
      weather,
      forecast,
      utcOffset,
    });
  };
  render() {
    return (
      <Container>
        <button onClick={() => console.log(this.state)}>PEEK_STATE</button>
        <CityAutoComplete handleSelect={this.handleCitySelected} />
        {this.state.loaded && <WeatherDisplay {...this.state.weather} />}
        {this.state.loaded && (
          <ForecastDisplay periods={this.state.forecast} offset={this.state.utcOffset} />
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 40rem;
  margin: auto;
  color: ${theme.gray27};

  background: ${theme.offWhite};
`;

export default App;
