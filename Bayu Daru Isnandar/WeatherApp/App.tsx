import React, { useState } from 'react';
// Import axios, BASE_URL, dan API_KEY
import axios from 'axios';
import { BASE_URL, API_KEY } from './src/components/constant';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import WeatherSearch from './src/components/weatherSearch';
import WeatherInfo from './src/components/weatherInfo';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState('');

  // Perbarui function searchWeather dengan menggunakan axios
  const searchWeather = (location) => {
    setStatus('loading');
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        // Konversi visibility dari meter ke kilometer
        data.visibility = (data.visibility / 1000).toFixed(2);
        // Konversi suhu dari Kelvin ke Celcius
        data.main.temp = (data.main.temp - 273.15).toFixed(2);
        setWeatherData(data);
        setStatus('success');
        console.log(data);
      })
      .catch((error) => {
        setStatus('error');
        console.error(error);
      });
  };

  // Definisikan function renderComponent
  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" />;
      case 'success':
        return <WeatherInfo weatherData={weatherData} />;
      case 'error':
        return (
          <Text style={styles.errorText}>
            Something went wrong. Please try again with a correct city name.
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      {/* Tampilkan data cuaca ketika ada weatherData */}
      <View style={styles.marginTop20}>{renderComponent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  marginTop20: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default App;
