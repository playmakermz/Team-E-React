import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, Text, Image, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'; 
import { BASE_URL, API_KEY } from './cuaca.json';
import { styles } from './style';

const WeatherScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [status, setStatus] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const searchWeather = async (location: string) => {
    setStatus('loading');
    try {
      const response = await axios.get(`${BASE_URL}?q=${location}&appid=${API_KEY}`);
      const data = response.data;
      data.visibility /= 1000;
      data.visibility = data.visibility.toFixed(2);
      data.main.temp -= 273.15;
      data.main.temp = data.main.temp.toFixed(2);
      setWeatherData(data);
      setStatus('success');
      await saveLog(data);
    } catch (error) {
      setStatus('error');
    }
  };

  const saveLog = async (weatherData) => {
    try {
      let logs = await AsyncStorage.getItem('logs');
      logs = logs ? JSON.parse(logs) : [];
      logs.push({
        city: weatherData.name,
        temperature: weatherData.main.temp,
        condition: weatherData.weather[0].description,
        date: new Date().toISOString(),
      });
      await AsyncStorage.setItem('logs', JSON.stringify(logs));
    } catch (error) {
      console.error(error);
    }
  };

  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" />;
      case 'success':
        return <WeatherInfo weatherData={weatherData} />;
      case 'error':
        return <Text>Please try again with a correct city name.</Text>;
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
      <View style={styles.weatherContainer}>{renderComponent()}</View>
    </ScrollView>
  );
};

const WeatherInfo: React.FC<{ weatherData: any }> = ({ weatherData }) => {
  return (
    <View style={styles.weatherInfoContainer}>
      <View style={styles.currentWeatherContainer}>
        <Image source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }} style={styles.weatherIcon} />
        <Text style={styles.temperature}>{weatherData.main.temp}°</Text>
        <Text style={styles.description}>{weatherData.weather[0].description}</Text>
        <Text style={styles.time}>{new Date().toLocaleTimeString()}</Text>
      </View>
      <View style={styles.forecastContainer}>
        <Text style={styles.forecastTitle}>4-Day Forecast</Text>
        <View style={styles.forecastRow}>
          <Text style={styles.forecastDay}>THU</Text>
          <Image source={{ uri: 'https://openweathermap.org/img/w/04d.png' }} style={styles.forecastIcon} />
          <Text style={styles.forecastTemp}>18/20</Text>
        </View>
      </View>
    </View>
  );
};

const LogScreen: React.FC = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      let logs = await AsyncStorage.getItem('logs');
      logs = logs ? JSON.parse(logs) : [];
      setLogs(logs);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLogs();
    }, [])
  );

  const deleteAllLogs = async () => {
    try {
      await AsyncStorage.removeItem('logs');
      setLogs([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {logs.map((log, index) => (
          <View key={index} style={styles.logItem}>
            <Text style={styles.logText}>City: {log.city}</Text>
            <Text style={styles.logText}>Temperature: {log.temperature || 'N/A'}°C</Text>
            <Text style={styles.logText}>Condition: {log.condition || 'N/A'}</Text>
            <Text style={styles.logText}>Date: {new Date(log.date).toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={deleteAllLogs}>
        <Text style={styles.buttonText}>Delete All Logs</Text>
      </TouchableOpacity>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const AppContainer: React.FC = () => {
  return (
    //<NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Weather"
          component={WeatherScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="cloud" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Log"
          component={LogScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="history" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    //</NavigationContainer>
  );
};

export default AppContainer;
