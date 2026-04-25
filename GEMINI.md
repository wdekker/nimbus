# Gemini AI Context

This document provides context and historical architectural decisions for AI assistants (like Gemini) working on this repository.

## Architecture
The application uses a strict **Container / Presenter** pattern.
- `app/index.tsx` acts purely as the presentation layer. It takes data and distributes it to child components. It contains NO data fetching logic.
- `hooks/useWeather.ts` is the central brain. All `fetch`, `AsyncStorage` caching, location logic, and autocomplete debouncing happens here. 
- UI Components live in `/components` and should remain stateless regarding API calls. They take strongly typed props (`WeatherData`) and return UI.
- Strict typings for the Open-Meteo API are located in `/types/weather.ts`.

## Technical Debt & Best Practices
- We recently removed the generic `app/modal.tsx` and leftover Expo template components (`components/themed-text`, etc.). Do not re-introduce them.
- Error boundaries have been implemented. If the API fails and there is no cache, `useWeather` returns an `error` state which is explicitly caught and displayed by `app/index.tsx` with a Retry button.
- We use `react-native` preset for Jest because `jest-expo` was colliding with `expo-modules-core` during runtime.

## APIs
We utilize Open-Meteo for our weather data because it requires no API key, making it excellent for open-source distributions. The responses are highly structured arrays of parallel data (e.g. `hourly.time[x]` matches `hourly.temperature_2m[x]`).
