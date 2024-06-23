import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { styles } from './style';
import { BASE_URL, API_KEY } from './cuaca.json';


const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [status, setStatus] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const searchWeather = (location: string) => {
    setStatus('loading');
    axios.get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 1000;
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15;
        data.main.temp = data.main.temp.toFixed(2);
        setWeatherData(data);
        setStatus('success');
      })
      .catch((error) => {
        setStatus('error');
      });
  };

  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" />;
      case 'success':
        return <WeatherInfo weatherData={weatherData} />;
      case 'error':
        return (
          <Text>
            Something went wrong. Please try again with a correct city name.
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search the weather of your city"
          value={location}
          onChangeText={setLocation}
        />
        <Button title="Search" onPress={() => searchWeather(location)} />
      </View>
      <View style={styles.weatherContainer}>
        {renderComponent()}
      </View>
    </ScrollView>
  );
};

const WeatherInfo: React.FC<{ weatherData: any }> = ({ weatherData }) => {
  return (
    <View style={styles.weatherInfoContainer}>
      <View style={styles.currentWeatherContainer}>
        <Image
          source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }}
          style={styles.weatherIcon}
        />
        <Text style={styles.temperature}>{weatherData.main.temp}°</Text>
        <Text style={styles.description}>{weatherData.weather[0].description}</Text>
        <Text style={styles.time}>{new Date().toLocaleTimeString()}</Text>
      </View>
      <View style={styles.forecastContainer}>
        <Text style={styles.forecastTitle}>4-Day Forecast</Text>
        {/* Forecast data needs to be fetched from another endpoint and mapped here */}
        <View style={styles.forecastRow}>
          <Text style={styles.forecastDay}>THU</Text>
          <Image
            source={{ uri: 'https://openweathermap.org/img/w/04d.png' }}
            style={styles.forecastIcon}
          />
          <Text style={styles.forecastTemp}>18/20</Text>
        </View>
        {/* Repeat forecastRow for each day */}
      </View>
    </View>
  );
};

export default App;
