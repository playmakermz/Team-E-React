import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import axios from "axios"
import { Video } from "expo-av"
import AsyncStorage from "@react-native-async-storage/async-storage"
import cuacaJson from "./cuaca.json"

const API_KEY = "4bcd8c693a267c32cfe12d0b452cc4a8"

const HomeScreen = ({ navigation }) => {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      setWeather(response.data)
      await saveLog(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const saveLog = async (weatherData) => {
    try {
      let logs = await AsyncStorage.getItem("logs")
      logs = logs ? JSON.parse(logs) : []
      logs.push({
        city: weatherData.name,
        temperature: weatherData.main.temp,
        condition: weatherData.weather[0].description,
        date: new Date(),
      })
      await AsyncStorage.setItem("logs", JSON.stringify(logs))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <Video
        source={require("./background.mp4")}
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />
      <View style={styles.overlay}>
        <Text style={styles.header}>Weather App</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          placeholderTextColor="#888"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.button} onPress={getWeather}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>
        {weather && (
          <View style={styles.weather}>
            <Text style={styles.weatherText}>City: {weather.name}</Text>
            <Text style={styles.weatherText}>
              Temperature: {weather.main.temp}°C
            </Text>
            <Text style={styles.weatherText}>
              Condition: {weather.weather[0].description}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Log")}
        >
          <Text style={styles.buttonText}>View Log</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const LogScreen = () => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        let logs = await AsyncStorage.getItem("logs")
        logs = logs ? JSON.parse(logs) : cuacaJson
        setLogs(logs)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLogs()
  }, [])

  const deleteAllLogs = async () => {
    try {
      await AsyncStorage.removeItem("logs")
      setLogs([])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <Video
        source={require("./background.mp4")}
        style={styles.backgroundVideo}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />
      <View style={styles.overlay}>
        <ScrollView>
          {logs.map((log, index) => (
            <View key={index} style={styles.logItem}>
              <Text style={styles.logText}>City: {log.city}</Text>
              <Text style={styles.logText}>
                Temperature: {log.temperature || "N/A"}°C
              </Text>
              <Text style={styles.logText}>
                Condition: {log.condition || "N/A"}
              </Text>
              <Text style={styles.logText}>
                Date: {new Date(log.date).toLocaleString()}
              </Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={deleteAllLogs}
        >
          <Text style={styles.buttonText}>Delete All Logs</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Log" component={LogScreen} />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    width: "50%",
  },
  header: {
    fontSize: 28,
    color: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    color: "#fff",
    width: "80%",
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  weather: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 5,
    alignItems: "center",
  },
  weatherText: {
    color: "#fff",
    fontSize: 16,
  },
  logItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  logText: {
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "red",
    marginTop: 20,
  },
})
