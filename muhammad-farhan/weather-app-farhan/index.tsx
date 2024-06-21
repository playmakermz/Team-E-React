import 'react-native-gesture-handler';
import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

const API_KEY = '0a4a4e2e87be3cfbb397d5c3a8c26c1c';

const HomeScreen = ({ logData, setLogData }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityInput, setCityInput] = useState('');

  useEffect(() => {
    fetchWeatherForCities();
  }, []);

  const fetchWeatherForCities = async () => {
    const cities = ['New York', 'London', 'Tokyo'];
    try {
      const promises = cities.map(async city => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
      const results = await Promise.all(promises);
      setWeatherData(results);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data');
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (cityInput.trim() !== '') {
      setLoading(true);
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData([data]);
        setError(null);
        const newLogEntry = `${new Date().toISOString().split('T')[0]}: ${data.name}, ${data.sys.country} - ${data.weather[0].main} - ${Math.round(data.main.temp)}°C - Timezone: ${data.timezone} - Visibility: ${data.visibility}m`;
        setLogData(prevLogData => [newLogEntry, ...prevLogData]);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data');
      }
      setLoading(false);
    }
  };

  const renderWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      case 'Rain':
        return '🌧️';
      case 'Snow':
        return '❄️';
      default:
        return '☀️';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App | Muhammad Farhan</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={cityInput}
          onChangeText={(text) => setCityInput(text)}
          placeholder="Masukan Nama Kota"
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Cari Kota</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {weatherData.map((data, index) => (
            <View key={index} style={styles.weatherContainer}>
              <Text style={styles.city}>{data.name}, {data.sys.country}</Text>
              <Text style={styles.icon}>{renderWeatherIcon(data.weather[0].main)}</Text>
              <Text style={styles.temperature}>{Math.round(data.main.temp)}°C</Text>
              <Text style={styles.description}>{data.weather[0].description}</Text>
              <Text style={styles.visibility}>Visibility: {data.visibility}m</Text>
              <Text style={styles.timezone}>Timezone: {data.timezone}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const LogScreen = ({ logData }) => {
  const sortedLogData = useMemo(() => {
    return [...logData].sort((a, b) => {
      const dateA = new Date(a.split(': ')[0]);
      const dateB = new Date(b.split(':')[0]);
      return dateB - dateA;
    });
  }, [logData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Log</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {sortedLogData.map((log, index) => (
          <View key={index} style={styles.logContainer}>
            <Text style={styles.logText}>{log}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  const [logData, setLogData] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Log') {
              iconName = 'list';
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home">
          {props => <HomeScreen {...props} logData={logData} setLogData={setLogData} />}
        </Tab.Screen>
        <Tab.Screen name="Log">
          {props => <LogScreen {...props} logData={logData} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: windowWidth - 40,
    maxWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 50,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: '#777',
  },
  visibility: {
    fontSize: 18,
    color: '#777',
  },
  timezone: {
    fontSize: 18,
    color: '#777',
  },
  loading: {
    fontSize: 18,
    marginTop: 20,
  },
  error: {
    color: 'ed',
    fontSize: 18,
    marginVertical: 20,
  },
  logContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: windowWidth - 40,
    maxWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logText: {
    fontSize: 18,
    color: '#777',
  },
});

export default App;