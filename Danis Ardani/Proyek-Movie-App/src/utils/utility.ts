import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`Data saved successfully for key: ${key}`);
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error);
  }
};

export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) as T : null;
  } catch (error) {
    console.error(`Error getting data for key ${key}:`, error);
    return null;
  }
};
