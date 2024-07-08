import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const WeatherInfo = ({weatherData}) => {
    const {
        name,
        main: { temp },
        clouds: { all: clouds },
        visibility,
        wind: { speed },
        weather: [{ icon, description }]
      } = weatherData;

    const iconUri = `https://openweathermap.org/img/w/${icon}.png`;

    return (
        <View style={styles.marginTop20}>
        <Text style={styles.text}>{name}</Text>
        <Text style={[styles.temperature, styles.marginTop20]}>{temp}C</Text>
        <View style={[styles.rowContainer, styles.marginTop20]}>
            <Image
            source={{ uri: iconUri }}
            style={styles.weatherIcon}
            />
            <Text style={[styles.text, styles.bold]}>{clouds}%</Text>
        </View>
        <Text style={styles.text}>{description}</Text>
        <View style={[styles.rowContainer, styles.marginTop20]}>
            <Text style={[styles.text, styles.bold]}>Visibility : </Text>
            <Text style={[styles.text, styles.marginLeft15]}>{visibility}</Text>
        </View>
        <View style={[styles.rowContainer, styles.marginTop20]}>
            <Text style={[styles.text, styles.bold]}>Wind Speed :</Text>
            <Text style={[styles.text, styles.marginLeft15]}>{speed} m/s</Text>
        </View>
        </View>
    )
}

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

export default WeatherInfo