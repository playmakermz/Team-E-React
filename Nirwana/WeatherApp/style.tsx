import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#DDDDDD',
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  weatherContainer: {
    width: '100%',
    alignItems: 'center',
  },
  weatherInfoContainer: {
    alignItems: 'center',
  },
  currentWeatherContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 80,
    fontWeight: '700',
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  time: {
    fontSize: 18,
    textAlign: 'center',
  },
  forecastContainer: {
    width: '100%',
    marginTop: 20,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  forecastDay: {
    fontSize: 18,
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
  forecastTemp: {
    fontSize: 18,
  },
});
