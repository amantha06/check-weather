// File: src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay';
import './App.css'; // Optional for basic styling

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); // State to track temperature unit ('metric' for Celsius, 'imperial' for Fahrenheit)

  // Function to fetch weather data based on selected city and unit
  const fetchWeather = async (cityName) => {
    if (!cityName) return; // Prevent fetching weather if no city is selected
    const API_KEY = '93587adb7b2b92900aa2a0b55f680a00'; // Your OpenWeatherMap API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${unit}`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError(''); // Clear error on successful fetch
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      fetchWeather(city);
    }
  };

  // Handle city change
  const handleCityChange = (e) => {
    setCity(e.target.value);
    fetchWeather(e.target.value); // Fetch weather immediately when city is changed
  };

  // Toggle between Celsius and Fahrenheit and fetch updated weather data
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  // Effect to refetch weather whenever the unit changes
  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [unit, city]);

  return (
    <div className="app">
      <h1>Weather App</h1>
      {/* Dropdown for selecting cities */}
      <form onSubmit={handleSubmit}>
        <select value={city} onChange={handleCityChange}>
          <option value="">Select a city</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Paris">Paris</option>
          <option value="Sydney">Sydney</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Toronto">Toronto</option>
          <option value="Berlin">Berlin</option>
          <option value="Dubai">Dubai</option>
          <option value="Rio de Janeiro">Rio de Janeiro</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
          <option value="Houston">Houston</option>
          <option value="Beijing">Beijing</option>
          <option value="Moscow">Moscow</option>
          <option value="Delhi">Delhi</option>
          <option value="Cairo">Cairo</option>
          <option value="Reston">Reston</option>
        </select>
        <button type="submit">Get Weather</button>
      </form>

      {/* Toggle button for switching temperature units */}
      <button className="toggle-button" onClick={toggleUnit}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>

      {error && <p className="error">{error}</p>}
      {weather && <WeatherDisplay weather={weather} unit={unit} />}
    </div>
  );
};

export default App;
