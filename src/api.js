import { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';

const openWeatherMapKey = '5ea6693fa6526dbdc50d2b5041249682';
const googleMapsKey = 'AIzaSyALNcAbAoUpA6VMCb1xhReW28Xg5jak6EY';

export const getWeatherFromLatLng = async (lat, lng) => {
  const resp = await global.fetch('https://api.openweathermap.org/data/2.5/' +
      `weather?lat=${lat}&lon=${lng}&units=metric` +
      `&APPID=${openWeatherMapKey}`);
  const data = await resp.json();
  console.log(data);
  return {
    temperature: data.main.temp,
    descriptionId: data.weather[0].id,
    description: data.weather[0].description,
  };
};
export const getForecastFromLatLng = async (lat, lng) => {
  const resp = await global.fetch('https://api.openweathermap.org/data/2.5/' +
      `forecast?lat=${lat}&lon=${lng}&units=metric` +
      `&APPID=${openWeatherMapKey}`);
  const data = await resp.json();
  return data.list.map(period => ({
    time: period.dt * 1000,
    temperature: period.main.temp,
    descriptionId: period.weather[0].id,
    description: period.weather[0].description,
  }));
};
export const getLatLngFromPlaceId = async (placeId) => {
  const geocodes = await geocodeByPlaceId(placeId);
  return getLatLng(geocodes[0]);
};
export const getUTCOffsetFromLatLng = async (lat, lng) => {
  const resp = await global.fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=0&key=${googleMapsKey}`);
  const data = await resp.json();
  return data.rawOffset * 1000;
};
