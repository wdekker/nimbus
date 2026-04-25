export const mockWeatherData = {
  latitude: 52.52,
  longitude: 13.41,
  timezone: 'Europe/Berlin',
  timezone_abbreviation: 'CET',
  current_weather: {
    temperature: 15.5,
    windspeed: 10.2,
    weathercode: 1,
    time: '2023-10-10T12:00',
  },
  hourly: {
    time: Array(24).fill('2023-10-10T12:00'),
    temperature_2m: Array(24).fill(15.5),
    weathercode: Array(24).fill(1),
  },
  daily: {
    time: Array(14).fill('2023-10-10'),
    weathercode: Array(14).fill(1),
    temperature_2m_max: Array(14).fill(20.0),
    temperature_2m_min: Array(14).fill(10.0),
  },
};
