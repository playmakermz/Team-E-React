import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorite from '../screens/Favorite';
import MovieDetail from '../components/MovieDetail';

const Stack = createNativeStackNavigator();

const FavoriteStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ headerTitle: "Movie Detail" }}
      />
    </Stack.Navigator>
  );
};

export default FavoriteStackNavigation;
