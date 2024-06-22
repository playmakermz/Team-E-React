import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
      <Stack.Screen 
          name="index" 
          options={{
            headerShown: true,
            headerTitle: 'Weather App',
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff',
            },
            headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'SpaceMono',
            },
          }} 
        />
        <Stack.Screen 
          name="history" 
          options={{
            headerShown: true,
            headerTitle: 'Weather App',
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff',
            },
            headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'SpaceMono',
            },
          }} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
