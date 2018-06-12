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
  getWeatherData = async (placeId) => {
    const { lat, lng } = await getLatLngFromPlaceId(placeId);
    // load in parallel
    const [weather, forecast, utcOffset] = await Promise.all([
      getWeatherFromLatLng(lat, lng),
      getForecastFromLatLng(lat, lng),
      getUTCOffsetFromLatLng(lat, lng),
    ]);
    console.log('setting new state:', weather);

    this.setState({
      loaded: true,
      placeId,
      weather,
      forecast,
      utcOffset,
    });
  };
  handleCitySelected = (placeId) => {
    // set state, then make api call
    this.setState({ loaded: false }, () => this.getWeatherData(placeId));
  };
  refresh = () => {
    // set state, then make api call
    this.setState({ loaded: false }, () => this.getWeatherData(this.state.placeId));
  };
  render() {
    return (
      <Container>
        {/* <button onClick={() => console.log(this.state)}>PEEK_STATE</button> */}
        <button onClick={() => this.refresh()}>REFRESH</button>
        <CityAutoComplete handleSelect={this.handleCitySelected} />
        {this.state.loaded ? (
          <React.Fragment>
            <WeatherDisplay {...this.state.weather} />
            <ForecastDisplay periods={this.state.forecast} offset={this.state.utcOffset} />
          </React.Fragment>
        ) : (
          <div>LOADIN lul</div>
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
