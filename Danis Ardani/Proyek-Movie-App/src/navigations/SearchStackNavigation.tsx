import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieDetail from '../components/MovieDetail';
import Search from 'src/screens/Search';

const Stack = createNativeStackNavigator();

const SearchStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ headerTitle: "Movie Detail" }}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigation;