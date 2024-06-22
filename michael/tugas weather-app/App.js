import React, { useState, useCallback, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { BASE_URL, API_KEY } from './constant';

import { v4 as uuid } from 'uuid';
import 'react-native-get-random-values';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const CustomTextInput = ({
  text,
  onChange,
  multiline=false,
  placeholder,
  numberOfLines,
}) => {
  const styles = StyleSheet.create({
    input: {
      borderWidth: 2,
      borderColor: '#DDDDDD',
      padding: 10,
      backgroundColor: 'white',
    },
    container: {
      marginTop: 20,
    },
  })

  return (
    <View style={styles.container}>
      <TextInput 
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChange}
        defaultValue={text}
      />
    </View>
  )
}

const WeatherInfo = ({ weatherData }) => {
  const styles = StyleSheet.create({
    marginTop20: {
      marginTop: 20,
    },
    marginLeft15: {
      marginLeft: 15,
    },
    text: {
      textAlign: 'center',
      fontSize: 16,
    },
    bold: {
      fontWeight: '700',
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    temperature: {
      fontWeight: '700',
      fontSize: 80,
      textAlign: 'center',
    },
    weatherIcon: {
      width: 50,
      height: 50,
    },
  })

  return (
    <View style={styles.marginTop20}>
      <Text style={styles.text}>The weather of {weatherData.name}</Text>
      <Text style={[styles.temperature, styles.marginTop20]}>{weatherData.main.temp} C</Text>
      <View style={[styles.rowContainer, styles.marginTop20]}>
        <Image
          source={{ uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }}
          style={styles.weatherIcon}
        />
        <Text style={[styles.text, styles.bold]}>{weatherData.weather[0].main}</Text>
      </View>
      <Text style={styles.text}>{weatherData.weather[0].description}</Text>
      <View style={[styles.rowContainer, styles.marginTop20]}>
        <Text style={[styles.text, styles.bold]}>Visibility :</Text>
        <Text style={[styles.text, styles.marginLeft15]}>{weatherData.visibility} km</Text>
      </View>
      <View style={[styles.rowContainer, styles.marginTop20]}>
        <Text style={[styles.text, styles.bold]}>Wind Speed :</Text>
        <Text style={[styles.text, styles.marginLeft15]}>{weatherData.wind.speed} m/s</Text>
      </View>
    </View>
  )
}

const WeatherSearch = ({ handleSearchButton }) => {
  const [location, setLocation] = useState('')

  const styles = StyleSheet.create({
    buttonWrapper: {
      marginTop: 20,
    },
  })

  return (
    <View>
      <CustomTextInput
        placeholder="Search the weather of your city"
        numberOfLines={1}
        text={location}
        onChange={setLocation}
      />
      <View style={styles.buttonWrapper}>
        <Button title="Search" onPress={() => { handleSearchButton(location) }} />
      </View>
    </View>
  )
}

const HomeScreen = ({
  navigation,
  route,
  addHistory,
  setFromHistory,
  fromHistory,
}) => {
  const [weatherData, setWeatherData] = useState();
  const [status, setStatus] = useState('');

  // show weather from location from history
  useEffect(() => {
    if (fromHistory) {
      setFromHistory(false);
      searchWeather(route.params.locationFromHistory);
    }
  });

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
        return;
    }
  };

  const searchWeather = (location) => {
    setStatus('loading');
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 1000;
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15; // konversi Kelvin ke Celcius
        data.main.temp = data.main.temp.toFixed(2);

        setWeatherData(data);
        setStatus('success');
      })
      .catch((error) => {
        setStatus('error');
        console.log(error);
      });
  };

  const handleSearchButton = (location) => {
    location = location.trim()
    setFromHistory(false);
    searchWeather(location);
    addHistory(location);
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 0,
    },
    marginTop20: {
      marginTop: 20,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <WeatherSearch handleSearchButton={handleSearchButton} />
        <View style={styles.marginTop20}>{renderComponent()}</View>
      </View>
    </>
  );
};

const HistoryScreen = ({
  navigation,
  route,
  history,
  deleteHistory,
  setFromHistory,
}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    historyItem: {
      marginBottom: 20,
      paddingHorizontal: 30,
      textAlign: 'center',
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

      backgroundColor: '#fff',
      borderRadius: 10,
    },
    historyText: {
      fontSize: 16,
    },
    noHistory: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const HistoryItem = ({ historyItem }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setFromHistory(true);
          navigation.navigate('Home', {
            locationFromHistory: historyItem.location,
          });
        }}
        style={styles.historyItem}>
        <Text style={styles.historyText}>{historyItem.location}</Text>
        <Button
          title="Delete"
          color="red"
          onPress={() => deleteHistory(historyItem.id)}
        />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => <HistoryItem historyItem={item} />;

  console.log('history length: ', history.length);

  return (
    <>
      <View style={styles.container}>
        {history.length !== 0 ? (
          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.noHistory}>
            <Text>No History!</Text>
          </View>
        )}
      </View>
    </>
  );
};

const App = () => {
  const [history, setHistory] = useState([]);
  // untuk menentukan apakah harus search dari history
  const [fromHistory, setFromHistory] = useState(false);

  // ======================== load and store history to async storage ==============
  // Load history dari async storage
  useEffect(() => {
    // Retrieving the array of objects
    getData('history').then((data) => {
      console.log('useEffect Load Data: ', data);

      setHistory(data);
    });
  }, []);

  // Store history ke async storage
  useEffect(() => {
    storeData('history', history);
  }, [history]);

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (err) {
      console.log('storeData: ', err);
    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue) {
        return JSON.parse(jsonValue);
      } else {
        return [];
      }
    } catch (err) {
      console.log('getData: ', err);
    }
  };

  // ===================================================================================

  const addHistory = (location) => {
    const newHistoryEntry = {
      id: uuid(),
      location: location,
    };
    setHistory((prev) => [newHistoryEntry, ...prev]);
  };

  const deleteHistory = (id) => {
    const newHistory = history.filter((item) => {
      return id !== item.id;
    });

    setHistory(newHistory);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'time' : 'time-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
        initialRouteName="Home">
        <Tab.Screen
          name="Home"
          children={(props) => (
            <HomeScreen
              {...props}
              addHistory={addHistory}
              fromHistory={fromHistory}
              setFromHistory={setFromHistory}
            />
          )}
          initialParams={{ locationFromHistory: '' }}
        />
        <Tab.Screen
          name="History"
          children={(props) => (
            <HistoryScreen
              {...props}
              history={history}
              deleteHistory={deleteHistory}
              setFromHistory={setFromHistory}
            />
          )}
          options={{ tabBarBadge: history.length }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
