import { useState, useCallback, useEffect } from "react"
import { View, Text, Button, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'; // npm install @react-navigation/drawer / npm install -g @react-navigation/drawer
import {styles} from './style'
import cuaceJson from './cuaca.json'
import { ScrollView } from "react-native-gesture-handler";
import axios from 'axios'
import { BASE_URL, API_KEY } from "./constant";

const Drawer = createDrawerNavigator(); // kemampuan berpindah "Menu" Button


// ============ Home() Adalah container ============
function Home(){
  let [informasi, setInformasi] = useState([cuaceJson]) // Data json awal masuk 
  let [lokasi, setLokasi] = useState('') // Lokasi adalah untuk informasi tujuan
  let [log, setLog] = useState([{name: informasi[0].name, country: informasi[0].sys.country, weather: informasi[0].weather[0].description ,id: informasi[0].id}])
  // Menyimpan riwayat pencarian
  console.log(lokasi)

  useEffect(() => { // Ambil API secara sementara.
    axios  // axios adalah bentuk dari "Promise".
      .get(`${BASE_URL}?q=${lokasi}&appid=${API_KEY}`) // Alamat tujuan Api yang diambil
      // https://api.openweathermap.org/data/2.5/weather?q=jakarta&appid=Key (hasil akhir link)
      .then((response) => {
        console.log(`State axios sukses: ${lokasi}`)
        setInformasi([response.data]) // ======= Untuk informasi utama 
        let qName = informasi[0].name
        let qCountry = informasi[0].sys.country
        let qWeather = informasi[0].weather[0].description
        let qid = informasi[0].id
        let qAbc = {name: qName, country: qCountry, weather: qWeather, id: qid}
        setLog([...log, qAbc]) // ======== Untuk riwayat pencarian =========
      })
      .catch((error) => { // Default, awal website render!
        console.log(`State Lokasi: ${lokasi}`)
        console.log(`Error: ${error} `)
      })
  }, [lokasi])


  // ============== App() ==============
  function App(){
    let [form, setForm] = useState('') // menyimpan data sementara pada form
    return(
      <View>

        <TextInput onChangeText={setForm} value={form} placeholder="Masukan nama kota" style={styles.form}/>

        <Button onPress={() => {setLokasi(form); setForm('')}} title="Submit data"/>

        <ScrollView>
          {informasi.map((item, index) => (

           <View key={index}>
            <Text>=================== {item.name} ================</Text>
             <Text>Nama Kota: {item.name}</Text>
            <Text>Nama Negara: {item.sys.country}</Text>
            <Text>Kondisi Cuaca: {item.weather[0].description}</Text>
            <Text>Pengelihatan : {item.visibility}</Text>
            <Text>Temprature : {item.main.temp}</Text>
            <Text>Timezone : {item.timezone}</Text>
            <Text>=================== {item.name} ================</Text>
           </View>

          ))}
        </ScrollView>
      </View>
    )
  }


  // ============== Log() ==========

  function Log(){
    return(
      <View>

        <ScrollView>
          {log.map((item, index) => (

            <View key={index}>
              <Text>================= {item.name} ===========</Text>
              <Text>Nama Kota : {item.name}</Text>
              <Text>Nama Negara : {item.country}</Text>
              <Text>Weather : {item.weather}</Text>
              <Text>================= {item.country} ===========</Text>
            </View>

          ))}
        </ScrollView>
      </View>
    )
  }


  // =========== Home() return =============
  return(
    <Drawer.Navigator initialRouteName="Home">
       <Drawer.Screen name="App" component={App} />
       <Drawer.Screen name="Log" component={Log} />
    </Drawer.Navigator>
  )
}

export default Home