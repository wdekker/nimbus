import { getWeatherInfo } from '../../utils/weather';
import { Sun, CloudRain } from 'lucide-react-native';

describe('weather utils', () => {
  it('returns correct label and icon for clear sky', () => {
    const info = getWeatherInfo(0);
    expect(info.label).toBe('Clear Sky');
    expect(info.icon).toBe(Sun);
  });

  it('returns correct label and icon for rain', () => {
    const info = getWeatherInfo(61);
    expect(info.label).toBe('Rain');
    expect(info.icon).toBe(CloudRain);
  });
});
