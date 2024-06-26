import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#DDDDDD',
    padding: 10,
    width: '50%',
    marginBottom: 10,
    textAlign: 'center',
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
  city:{
    fontSize:100,
    fontWeight: '800',
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
  logItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  logText: {
    color: '#000',
  },
  deleteButton: {
    backgroundColor: 'red',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
