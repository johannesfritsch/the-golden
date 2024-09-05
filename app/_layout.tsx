import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabBar from '@/components/TabBar';
import { View, ScrollView } from 'react-native';
import Rive, { Alignment, Fit } from 'rive-react-native';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Header />
        <ScrollView style={{ backgroundColor: '#fff', flexGrow: 1, gap: 10, padding: 10 }}>
          <Slot />
          <Footer />
        </ScrollView>
        <TabBar />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
