import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const SearchHistory: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<{ city: string, timestamp: number }[]>([]);
  const router = useRouter();
  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('logHistory');
        
        if (history) {
          console.log(JSON.parse(history))
          setSearchHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Failed to load search history', error);
      }
    };

    loadSearchHistory();
  }, []);

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem('logHistory');
      await AsyncStorage.clear();
      setSearchHistory([]);
    } catch (error) {
      console.error('Failed to clear search history', error);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <View style={styles.container}>
      {searchHistory.length > 0 ? (
        <FlatList
          data={searchHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.number}>{index + 1}.</Text>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.city}</Text>
                <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <Text style={styles.noHistoryText}>No search history found.</Text>
      )}

      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={() => clearSearchHistory()}>
        <Text style={styles.buttonText}>Clear Search History</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  flatListContainer: {
    flexGrow: 1,
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  number: {
    marginRight: 10,
    color: '#ffa500',
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  timestamp: {
    color: '#aaa',
    fontSize: 12,
  },
  noHistoryText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#ff6347',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SearchHistory;
