import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface WeatherData {
  temperature: number;
  description: string;
  city: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windGust: number;
  windDeg: number;
  pressure: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  rain?: number;
  snow?: number;
  sunrise: number;
  sunset: number;
  visibility: number;
  clouds: number;
  lat: number;
  lon: number;
}

const Weather: React.FC<WeatherData> = ({
  temperature, description, city, icon, humidity, windSpeed, windGust, windDeg, pressure,
  feelsLike, tempMin, tempMax, rain, snow, sunrise, sunset, visibility, clouds, lat, lon
}) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.coords}>Lat: {lat}, Lon: {lon}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
        style={styles.icon}
      />
      <Text style={styles.temperature}>{Math.round(temperature - 273.15)}°C</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.detail}>Feels Like: {Math.round(feelsLike - 273.15)}°C</Text>
      <Text style={styles.detail}>Min Temp: {Math.round(tempMin - 273.15)}°C</Text>
      <Text style={styles.detail}>Max Temp: {Math.round(tempMax - 273.15)}°C</Text>
      <Text style={styles.detail}>Humidity: {humidity}%</Text>
      <Text style={styles.detail}>Wind Speed: {windSpeed} m/s</Text>
      <Text style={styles.detail}>Wind Gust: {windGust} m/s</Text>
      <Text style={styles.detail}>Wind Direction: {windDeg}°</Text>
      <Text style={styles.detail}>Pressure: {pressure} hPa</Text>
      {rain !== undefined && <Text style={styles.detail}>Rain (1h): {rain} mm</Text>}
      {snow !== undefined && <Text style={styles.detail}>Snow (1h): {snow} mm</Text>}
      <Text style={styles.detail}>Visibility: {visibility} m</Text>
      <Text style={styles.detail}>Cloudiness: {clouds}%</Text>
      <Text style={styles.detail}>Sunrise: {formatTime(sunrise)}</Text>
      <Text style={styles.detail}>Sunset: {formatTime(sunset)}</Text>
    </View>
  );
};

const Main: React.FC = () => {
const API_KEY = 'open_weather_api_key';
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const addLog = async (data: Object) => {
    try {
      const history = await AsyncStorage.getItem('logHistory');
      console.log("nih history", history)
      if (history) {
        console.log("masok")
        const prevHistory = JSON.parse(history);
        const newSearchHistory = [...prevHistory, data];
        await AsyncStorage.setItem('logHistory', JSON.stringify(newSearchHistory));
      } else {
        await AsyncStorage.setItem('logHistory', JSON.stringify([data]));
      }
    } catch (error) {
      console.error('Failed to load search history', error);
    }
  };

  const fetchWeather = async (city: string) => {
    if (!city.trim()) {
      setError('City name is required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = response.data;
      const weatherInfo: WeatherData = {
        temperature: data.main.temp,
        description: data.weather[0].description,
        city: data.name,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windGust: data.wind.gust,
        windDeg: data.wind.deg,
        pressure: data.main.pressure,
        feelsLike: data.main.feels_like,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        rain: data.rain ? data.rain['1h'] : undefined,
        snow: data.snow ? data.snow['1h'] : undefined,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        visibility: data.visibility,
        clouds: data.clouds.all,
        lat: data.coord.lat,
        lon: data.coord.lon
      };
      setWeatherData(weatherInfo);
      addLog({ city, timestamp: Date.now() })
    } catch (err) {
      addLog({ city, timestamp: Date.now() })
      setError('Could not fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Enter city name"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={() => fetchWeather(city)}>
          <Text style={styles.iconText}>🔍</Text>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          router.push({pathname: '/history'
          })}}>
          <Text style={styles.buttonText}>View Search History</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="#1e90ff" style={styles.loading} />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          weatherData && (
            <Weather {...weatherData} />
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#1e90ff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
    backgroundColor: '#222',
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  iconText: {
    fontSize: 20,
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  weatherContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  coords: {
    fontSize: 16,
    color: '#aaa',
  },
  icon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 24,
    marginVertical: 10,
    color: '#ffa500',
  },
  description: {
    fontSize: 18,
    color: '#ccc',
  },
  detail: {
    fontSize: 16,
    color: '#aaa',
    marginVertical: 5,
  },
  error: {
    color: 'red',
    marginVertical: 10,
    fontSize: 16,
  },
  loading: {
    marginVertical: 20,
  },
});

export default Main;

