import React, { useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../constants/constant";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Define types
interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  visibility: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

interface WeatherSearchProps {
  searchWeather: (location: string) => void;
}

interface WeatherInfoProps {
  weatherData: WeatherData;
}

interface HomeScreenProps {
  navigation: any;
  history: HistoryItem[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
}

interface HistoryScreenProps {
  history: HistoryItem[];
  clearHistory: () => void;
}

interface HistoryItem {
  location: string;
  data: WeatherData;
}

// CustomTextInput component
const CustomTextInput: React.FC<{
  text: string;
  onChange: (text: string) => void;
  multiline?: boolean;
  placeholder: string;
  numberOfLines: number;
}> = ({ text, onChange, multiline = false, placeholder, numberOfLines }) => (
  <View style={styles.inputContainer}>
    <TextInput
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChange}
      defaultValue={text}
    />
  </View>
);

// WeatherSearch component
const WeatherSearch: React.FC<WeatherSearchProps> = ({ searchWeather }) => {
  const [location, setLocation] = useState("");

  return (
    <View>
      <CustomTextInput
        placeholder="Search the weather of your city"
        numberOfLines={1}
        text={location}
        onChange={setLocation}
      />
      <View style={styles.buttonWrapper}>
        <Button title="Search" onPress={() => searchWeather(location)} />
      </View>
    </View>
  );
};

// WeatherInfo component
const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData }) => {
  return (
    <View style={[styles.marginTop20, styles.marginBottom20]}>
      <Text style={styles.text}>The weather of {weatherData.name}</Text>
      <Text style={[styles.temperature, styles.marginTop20]}>
        {weatherData.main.temp} °C
      </Text>
      <View style={[styles.rowContainer, styles.marginTop20]}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
          }}
          style={styles.weatherIcon}
        />
        <Text style={[styles.text, styles.bold]}>
          {weatherData.weather[0].main}
        </Text>
      </View>
      <Text style={styles.text}>{weatherData.weather[0].description}</Text>
      <View style={[styles.rowContainer, styles.marginTop20]}>
        <Text style={[styles.text, styles.bold]}>Visibility :</Text>
        <Text style={[styles.text, styles.marginLeft15]}>
          {weatherData.visibility} km
        </Text>
      </View>
      <View style={[styles.rowContainer, styles.marginTop20]}>
        <Text style={[styles.text, styles.bold]}>Wind Speed :</Text>
        <Text style={[styles.text, styles.marginLeft15]}>
          {weatherData.wind.speed} m/s
        </Text>
      </View>
    </View>
  );
};

// HomeScreen component
const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
  history,
  setHistory,
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<string>("");

  const renderComponent = () => {
    switch (status) {
      case "loading":
        return <ActivityIndicator size="large" />;
      case "success":
        return weatherData ? <WeatherInfo weatherData={weatherData} /> : null;
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

  const searchWeather = (location: string) => {
    setStatus("loading");
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data: WeatherData = response.data;
        data.visibility /= 1000;
        data.visibility = parseFloat(data.visibility.toFixed(2));
        data.main.temp -= 273.15;
        data.main.temp = parseFloat(data.main.temp.toFixed(2));
        setWeatherData(data);
        setHistory([...history, { location, data }]);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <ScrollView style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      <View style={styles.marginTop20}>{renderComponent()}</View>
      <Button
        title="Go to History"
        onPress={() => navigation.navigate("History")}
      />
    </ScrollView>
  );
};

// HistoryScreen component
const HistoryScreen: React.FC<HistoryScreenProps> = ({
  history,
  clearHistory,
}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.marginBottom20}>
        <Button
          title="Clear History"
          onPress={clearHistory}
        />
      </View>
      {history.length === 0 ? (
        <Text>No search history available.</Text>
      ) : (
        history.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyText}>{item.location}</Text>
            <Text style={styles.historyText}>
              Temperature: {item.data.main.temp} °C
            </Text>
            <Text style={styles.historyText}>
              Visibility: {item.data.visibility} km
            </Text>
            <Text style={styles.historyText}>
              Weather: {item.data.weather[0].main}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

// Main App component with Navigation
const Stack = createStackNavigator();

const App: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen {...props} history={history} setHistory={setHistory} />
          )}
        </Stack.Screen>
        <Stack.Screen name="History">
          {(props) => (
            <HistoryScreen
              {...props}
              history={history}
              clearHistory={clearHistory}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#DDDDDD",
    padding: 10,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginBottom20: {
    marginBottom: 20,
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
  historyItem: {
    marginBottom: 10,
    padding: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 5,
  },
  historyText: {
    fontSize: 14,
  },
});

export default App;
