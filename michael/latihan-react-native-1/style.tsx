import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
  container: {
    marginTop: 24,  // untuk status bar
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 24,
  },

  judulWrapper: {
    marginTop: 24,
    paddingVertical: 30,
    width: '100%',
    backgroundColor: 'black',
  },

  judul: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },

  inputWrapper: {
    width: '100%',
    marginTop: 20,
  },

  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlign: 'center',
    fontSize: 24,
  },

  containerTombol: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  button: {
    flex: 1,
    height: 54,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },

  buttonText: {
    fontSize: 24,
  },

  buttonClear: {
    flex: 1,
    height: 54,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'red',
  },
    
  textClear: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 8,
    color: 'white'
  },
});

export { styles }