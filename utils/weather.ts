import { Sun, Cloud, CloudSun, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning } from 'lucide-react-native';

export const getWeatherInfo = (code: number) => {
  if (code === 0) return { icon: Sun, label: 'Clear Sky' };
  if (code === 1 || code === 2) return { icon: CloudSun, label: 'Partly Cloudy' }; 
  if (code === 3) return { icon: Cloud, label: 'Overcast' };
  if (code === 45 || code === 48) return { icon: CloudFog, label: 'Fog' };
  if (code >= 51 && code <= 55) return { icon: CloudDrizzle, label: 'Drizzle' };
  if (code >= 61 && code <= 65) return { icon: CloudRain, label: 'Rain' };
  if (code >= 71 && code <= 77) return { icon: CloudSnow, label: 'Snow' };
  if (code >= 95 && code <= 99) return { icon: CloudLightning, label: 'Thunderstorm' };
  return { icon: Sun, label: 'Clear' };
};
