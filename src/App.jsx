import React, { Component } from 'react';
import styled from 'styled-components';

import {
  getLatLngFromPlaceId,
  getWeatherFromLatLng,
  getForecastFromLatLng,
  getUTCOffsetFromLatLng,
} from './api';
import CityAutoComplete from './CityAutocomplete';
import Report from './Report';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import theme from './theme';

class App extends Component {
  state = {
    loading: false,
    hydrated: false,
    error: false,
    weather: null,
    forecast: null,
    utcOffset: 0,
  };
  // for unknown errors
  componentDidCatch = (error) => {
    this.setState({
      error,
    });
  };
  getWeatherData = async (placeId) => {
    // TODO: add more specific error handling
    try {
      const { lat, lng } = await getLatLngFromPlaceId(placeId);
      // load in parallel
      const [weather, forecast, utcOffset] = await Promise.all([
        getWeatherFromLatLng(lat, lng),
        getForecastFromLatLng(lat, lng),
        getUTCOffsetFromLatLng(lat, lng),
      ]);
      this.setState({
        loading: false,
        hydrated: true,
        error: false,
        placeId,
        weather,
        forecast,
        utcOffset,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: e,
      });
    }
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
      <Background>
        <Container>
          {/* <button onClick={() => console.log(this.state)}>PEEK_STATE</button> */}
          <CityAutoComplete handleSelect={this.handleCitySelected} />
          <Content>
            {/* TODO: design a less brittle loading/error state */}
            {this.state.loading && <LoadingSpinner size="2x" />}
            {this.state.error && !this.state.loading && <ErrorMessage />}
            {this.state.hydrated &&
              !this.state.loading &&
              !this.state.error && (
                <Report
                  error={this.state.error}
                  locationName={this.state.locationName}
                  weather={this.state.weather}
                  forecast={this.state.forecast}
                  handleRefresh={this.refresh}
                  utcOffset={this.state.utcOffset}
                />
              )}
          </Content>
        </Container>
      </Background>
    );
  }
}
const Background = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(white, ${theme.skyBlue});
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 40rem;
  margin: auto;
  color: ${theme.gray27};
  height: 100%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  flex-grow: 1;
`;

export default App;
