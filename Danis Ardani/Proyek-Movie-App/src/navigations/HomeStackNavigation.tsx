import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import MovieDetail from '../components/MovieDetail';
import AllMovies from 'src/components/AllMovies';

const Stack = createNativeStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ headerTitle: "Movie Detail" }}
      />
      <Stack.Screen
        name="AllMovies"
        component={AllMovies}
        options={{ headerTitle: "All Movies" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;