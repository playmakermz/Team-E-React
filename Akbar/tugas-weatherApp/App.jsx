import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from "axios";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";

// API constants
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "";

// CustomTextInput
const CustomTextInput = ({
  text,
  onChange,
  multiline = false,
  placeholder,
  numberOfLines,
}) => (
  <View style={stylesInput.container}>
    <TextInput
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={stylesInput.input}
      placeholder={placeholder}
      onChangeText={onChange}
      defaultValue={text}
    />
  </View>
);

const stylesInput = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#DDDDDD",
    padding: 10,
  },
  container: {
    marginTop: 20,
  },
});

// WeatherInfo
const WeatherInfo = ({ weatherData }) => {
  return (
    <View style={[stylesInfo.marginTop20, stylesInfo.marginBottom20]}>
      <Text style={stylesInfo.text}>The weather of {weatherData.name}</Text>
      <Text style={[stylesInfo.temperature, stylesInfo.marginTop20]}>
        {weatherData.main.temp} °C
      </Text>
      <View style={[stylesInfo.rowContainer, stylesInfo.marginTop20]}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
          }}
          style={stylesInfo.weatherIcon}
        />
        <Text style={[stylesInfo.text, stylesInfo.bold]}>
          {weatherData.weather[0].main}
        </Text>
      </View>
      <Text style={stylesInfo.text}>{weatherData.weather[0].description}</Text>
      <View style={[stylesInfo.rowContainer, stylesInfo.marginTop20]}>
        <Text style={[stylesInfo.text, stylesInfo.bold]}>Visibility :</Text>
        <Text style={[stylesInfo.text, stylesInfo.marginLeft15]}>
          {weatherData.visibility} km
        </Text>
      </View>
      <View style={[stylesInfo.rowContainer, stylesInfo.marginTop20]}>
        <Text style={[stylesInfo.text, stylesInfo.bold]}>Wind Speed :</Text>
        <Text style={[stylesInfo.text, stylesInfo.marginLeft15]}>
          {weatherData.wind.speed} m/s
        </Text>
      </View>
    </View>
  );
};

const stylesInfo = StyleSheet.create({
  marginTop20: {
    marginTop: 20,
  },
  marginLeft15: {
    marginLeft: 15,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
  bold: {
    fontWeight: "700",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  temperature: {
    fontWeight: "700",
    fontSize: 80,
    textAlign: "center",
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});

// WeatherSearch
const WeatherSearch = ({ searchWeather }) => {
  const [location, setLocation] = useState("");
  return (
    <View>
      <CustomTextInput
        placeholder="Search the weather of your city"
        numberOfLines={1}
        text={location}
        onChange={setLocation}
      />
      <View style={stylesSearch.buttonWrapper}>
        <TouchableOpacity
          style={stylesSearch.button}
          onPress={() => searchWeather(location)}
        >
          <Text style={stylesSearch.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const stylesSearch = StyleSheet.create({
  buttonWrapper: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

// SearchLogScreen
const SearchLogScreen = ({ searchLog }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search History</Text>
      <FlatList
        data={searchLog}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text>=====================================================</Text>
            <Text style={styles.cityName}>{item.name}</Text>
            <Text>Temperature: {item.main.temp} °C</Text>
            <Text>Description: {item.weather[0].description}</Text>
            <Text>Visibility: {item.visibility} km</Text>
            <Text>Wind Speed: {item.wind.speed} m/s</Text>
            <Text>=====================================================</Text>
          </View>
        )}
      />
    </View>
  );
};

const stylesLog = StyleSheet.create({
  logItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cityName: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const WeatherSearchScreen = ({ searchWeather, weatherData, status }) => {
  const renderComponent = () => {
    switch (status) {
      case "loading":
        return <ActivityIndicator size="large" />;
      case "success":
        return <WeatherInfo weatherData={weatherData} />;
      case "error":
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
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      <View style={styles.marginTop20}>{renderComponent()}</View>
    </View>
  );
};

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState("");
  const [searchLog, setSearchLog] = useState([]);

  const searchWeather = (location) => {
    setStatus("loading");
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        data.visibility /= 1000;
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15;
        data.main.temp = data.main.temp.toFixed(2);
        setWeatherData(data);
        setSearchLog((prevLog) => [...prevLog, data]);
        setStatus("success");
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  };

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="WeatherSearch">
        <Tab.Screen name="Home">
          {(props) => (
            <WeatherSearchScreen
              {...props}
              searchWeather={searchWeather}
              weatherData={weatherData}
              status={status}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Search Log">
          {(props) => <SearchLogScreen {...props} searchLog={searchLog} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  marginTop20: {
    marginTop: 20,
  },
});

export default App;
