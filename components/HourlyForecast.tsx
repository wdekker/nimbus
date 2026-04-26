import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Sunrise, Sunset, Wind } from 'lucide-react-native';
import { getWeatherInfo, formatWindSpeed, generateHourlyItems } from '../utils/weather';
import { WeatherData, WindSpeedUnit } from '../types/weather';

export function HourlyScrollList({ items, windUnit, isDark }: { items: any[], windUnit: WindSpeedUnit, isDark: boolean }) {
  const textColor = isDark ? '#f8fafc' : '#ffffff';
  const subTextColor = isDark ? '#cbd5e1' : '#e0f2fe';
  const cardBg = isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.2)';

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
      {items.map((item: any, index: number) => {
        if (item.type === 'hour') {
          const Icon = item.icon;
          return (
            <View key={`hour-${index}`} style={[styles.hourlyItem, { backgroundColor: cardBg }]}>
              <Text style={[styles.hourlyTime, { color: subTextColor }]} numberOfLines={1}>{item.timeStr}</Text>
              <Icon size={26} color={textColor} style={{ marginTop: 6, marginBottom: item.precip > 0 ? 0 : 4 }} />
              
              {item.precip > 0 && (
                <Text style={{ color: '#38bdf8', fontSize: 11, fontWeight: '600', marginBottom: 4 }}>{item.precip}%</Text>
              )}
              
              <Text style={[styles.hourlyTemp, { color: textColor }]}>{item.temp}</Text>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, opacity: 0.7 }}>
                <Wind size={12} color={subTextColor} style={{marginRight: 2}}/>
                <Text style={{ fontSize: 11, color: subTextColor }} numberOfLines={1}>{formatWindSpeed(item.wind, windUnit)}</Text>
              </View>
            </View>
          );
        } else {
          const isSunrise = item.type === 'sunrise';
          const SunIcon = isSunrise ? Sunrise : Sunset;
          return (
            <View key={`sun-${index}`} style={[styles.hourlyItem, { backgroundColor: cardBg, justifyContent: 'center' }]}>
              <Text style={[styles.hourlyTime, { color: subTextColor }]} numberOfLines={1}>{item.timeStr}</Text>
              <SunIcon size={32} color={isSunrise ? '#fbbf24' : '#fb923c'} style={{ marginVertical: 10 }} />
              <Text style={[styles.hourlyTime, { color: textColor, fontWeight: '600' }]} numberOfLines={1}>{isSunrise ? 'Sunrise' : 'Sunset'}</Text>
            </View>
          );
        }
      })}
    </ScrollView>
  );
}

interface HourlyForecastProps {
  hourly: WeatherData['hourly'];
  daily: WeatherData['daily'];
  currentHourString: string;
  windUnit: WindSpeedUnit;
  isDark: boolean;
}

export function HourlyForecast({ hourly, daily, currentHourString, windUnit, isDark }: HourlyForecastProps) {
  const textColor = isDark ? '#f8fafc' : '#ffffff';

  let startHourIndexToday = 0;
  const now = new Date();
  const currentHourPrefix = currentHourString.substring(0, 13) + ":00";
  let idx = hourly.time.findIndex((t: string) => t === currentHourPrefix);
  
  if (idx === -1) {
    idx = hourly.time.findIndex((t: string) => new Date(t).getTime() >= now.getTime() - 3600000);
  }
  if (idx !== -1) {
    startHourIndexToday = idx;
  }

  const items = generateHourlyItems(hourly, daily, startHourIndexToday, 24, true);

  return (
    <View style={styles.hourlyContainer}>
      <Text style={[styles.forecastTitle, { color: textColor }]}>Hourly Forecast</Text>
      <HourlyScrollList items={items} windUnit={windUnit} isDark={isDark} />
    </View>
  );
}

const styles = StyleSheet.create({
  hourlyContainer: { width: '100%', marginBottom: 30 },
  forecastTitle: { fontSize: 20, fontWeight: '600', marginBottom: 15 },
  hourlyScroll: { flexDirection: 'row' },
  hourlyItem: { 
    alignItems: 'center', 
    paddingVertical: 15, 
    paddingHorizontal: 4, 
    borderRadius: 20, 
    marginRight: 10,
    width: 72
  },
  hourlyTime: { fontSize: 14, fontWeight: '500' },
  hourlyTemp: { fontSize: 18, fontWeight: '600' },
});
