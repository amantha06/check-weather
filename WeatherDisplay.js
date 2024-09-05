// File: src/WeatherDisplay.js
import React from 'react';

const WeatherDisplay = ({ weather, unit }) => {
  const { name, main, weather: weatherDetails, wind } = weather;

  // Determine the unit label for temperature display
  const temperatureUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="weather-display">
      <h2>Weather in {name}</h2>
      <p>Temperature: {main.temp}{temperatureUnit}</p>
      <p>Description: {weatherDetails[0].description}</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDisplay;
