import { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { styles } from "./style";
import cuaceJson from "./cuaca.json";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { BASE_URL, API_KEY } from "./constant";

const Drawer = createDrawerNavigator();

function Home() {
  let [informasi, setInformasi] = useState([cuaceJson]);
  let [lokasi, setLokasi] = useState("");
  let [log, setLog] = useState([
    {
      name: informasi[0].name,
      country: informasi[0].sys.country,
      weather: informasi[0].weather[0].description,
      id: informasi[0].id,
    },
  ]);

  console.log(lokasi);

  useEffect(() => {
    if (lokasi) {
      axios
        .get(`${BASE_URL}?q=${lokasi}&appid=${API_KEY}`)
        .then((response) => {
          console.log(`State axios sukses: ${lokasi}`);
          setInformasi([response.data]);
          let qName = response.data.name;
          let qCountry = response.data.sys.country;
          let qWeather = response.data.weather[0].description;
          let qid = response.data.id;
          let qAbc = {
            name: qName,
            country: qCountry,
            weather: qWeather,
            id: qid,
          };
          setLog([...log, qAbc]);
        })
        .catch((error) => {
          console.log(`State Lokasi: ${lokasi}`);
          console.log(`Error: ${error}`);
        });
    }
  }, [lokasi]);

  function App() {
    let [form, setForm] = useState("");
    return (
      <View>
        <TextInput
          onChangeText={setForm}
          value={form}
          placeholder="Masukan nama kota"
          style={styles.form}
        />
        <Button
          onPress={() => {
            setLokasi(form);
            setForm("");
          }}
          title="Submit data"
        />

        <ScrollView>
          {informasi.map((item, index) => (
            <View key={index}>
              <Text>=================== {item.name} ================</Text>
              <Text>Nama Kota: {item.name}</Text>
              <Text>Nama Negara: {item.sys.country}</Text>
              <Text>Kondisi Cuaca: {item.weather[0].description}</Text>
              <Text>Pengelihatan: {item.visibility}</Text>
              <Text>Temperature: {item.main.temp}</Text>
              <Text>Humidity: {item.main.humidity}</Text>
              <Text>Pressure: {item.main.pressure}</Text>
              <Text>Wind Speed: {item.wind.speed}</Text>
              <Text>Timezone: {item.timezone}</Text>
              <Text>=================== {item.name} ================</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  function Log() {
    return (
      <View>
        <ScrollView>
          {log.map((item, index) => (
            <View key={index}>
              <Text>================= {item.name} ===========</Text>
              <Text>Nama Kota: {item.name}</Text>
              <Text>Nama Negara: {item.country}</Text>
              <Text>Weather: {item.weather}</Text>
              <Text>================= {item.country} ===========</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="App" component={App} />
      <Drawer.Screen name="Log" component={Log} />
    </Drawer.Navigator>
  );
}

export default Home;
