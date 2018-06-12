import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

import {
  getLatLngFromPlaceId,
  getWeatherFromLatLng,
  getForecastFromLatLng,
  getUTCOffsetFromLatLng,
} from './api';
import CityAutoComplete from './CityAutocomplete';
import Report from './Report';
import theme from './theme';

class App extends Component {
  state = {
    loading: false,
    hydrated: false,
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
      loading: false,
      hydrated: true,
      placeId,
      weather,
      forecast,
      utcOffset,
    });
  };
  handleCitySelected = (locationName, placeId) => {
    // set state, then make api call
    this.setState({ locationName, loading: true }, () => this.getWeatherData(placeId));
  };
  refresh = () => {
    // set state, then make api call
    this.setState({ loading: true }, () => this.getWeatherData(this.state.placeId));
  };
  render() {
    return (
      <Container>
        {/* <button onClick={() => console.log(this.state)}>PEEK_STATE</button> */}
        <CityAutoComplete handleSelect={this.handleCitySelected} />
        {this.state.loading && <FontAwesome name="spinner" />}
        {this.state.hydrated &&
          !this.state.loading && (
            <Report
              locationName={this.state.locationName}
              weather={this.state.weather}
              forecast={this.state.forecast}
              handleRefresh={this.refresh}
              utcOffset={this.state.utcOffset}
            />
          )}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 40rem;
  margin: auto;
  color: ${theme.gray27};
  background: ${theme.offWhite};
  height: 100%;
`;

export default App;
