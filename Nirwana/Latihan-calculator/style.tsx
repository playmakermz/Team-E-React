import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  
  containerSibling: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  
  button: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
  },
  
  buttonText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: '#fff',
    fontSize: 18,
  },

  buttonClear: {
    backgroundColor: 'red',
  },

  buttonOperator: {
    backgroundColor: '#ff8c00',
  },

  buttonNumber: {
    backgroundColor: '#1e90ff',
  },

  buttonSubmit: {
    backgroundColor: '#32cd32',
  },
});

export { styles };
