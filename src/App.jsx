import React, { Component } from 'react';
import styled from 'styled-components';
import WeatherIcons from 'react-weathericons';

import { getWeatherFromLatLng, getLatLngFromPlaceId } from './api';
import theme from './theme';

import CityAutoComplete from './CityAutoComplete';

const googleMapsKey = 'AIzaSyALNcAbAoUpA6VMCb1xhReW28Xg5jak6EY';
const openWeatherKey = '5ea6693fa6526dbdc50d2b5041249682';

class App extends Component {
  state = {
    weather: { temperature: '-1000' },
  };
  handleCitySelected = async (placeId) => {
    const { lat, lng } = await getLatLngFromPlaceId(placeId);
    const weather = await getWeatherFromLatLng(lat, lng);
    this.setState({
      weather,
    });
  };
  render() {
    return (
      <div>
        <WeatherDisplay>{this.state.weather.temperature}</WeatherDisplay>
        <CityAutoComplete handleSelect={this.handleCitySelected} />
        <div>test</div>
        <WeatherIcons name="cloud" />
      </div>
    );
  }
}

const WeatherDisplay = styled.div`
  display: block;
  width: 50px;
  margin: auto;
  background: red;
  color: pink;
`;

export default App;
