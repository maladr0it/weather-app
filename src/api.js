import { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';

const openWeatherMapKey = '5ea6693fa6526dbdc50d2b5041249682';

// sample request
// http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=5ea6693fa6526dbdc50d2b5041249682

export const getWeatherFromLatLng = async (lat, lng) => {
  const resp = await global.fetch('https://api.openweathermap.org/data/2.5/' +
      `weather?lat=${lat}&lon=${lng}&units=metric` +
      `&APPID=${openWeatherMapKey}`);
  const data = await resp.json();
  // return data;
  return {
    temperature: data.main.temp,
  };
};

export const getLatLngFromPlaceId = async (placeId) => {
  const geocodes = await geocodeByPlaceId(placeId);
  return getLatLng(geocodes[0]);
};
