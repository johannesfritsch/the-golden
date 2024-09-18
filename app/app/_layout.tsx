import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Drawer from '@/components/Drawer';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { trpc } from '@/utils/trpc';
import { httpBatchLink } from '@trpc/client';
import Config from "react-native-config";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: Config.TRPC_BASE_URL,
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          authorization: 'Bearer 123',
        };
      },
    }),
  ],
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    RobotoRegular: require('../assets/fonts/Roboto-Regular.ttf'),
    RobotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
    RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
    RobotoBlack: require('../assets/fonts/Roboto-Black.ttf'),
    RobotoItalic: require('../assets/fonts/Roboto-Italic.ttf'),
    DMSerifDisplay: require('../assets/fonts/DMSerifDisplay-Regular.ttf'),
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
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            <Drawer>
              <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
                <Stack.Screen name="(app)/info/productInfo" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
              </Stack>
            </Drawer>
            {__DEV__ && <DevToolsBubble />}
          </GestureHandlerRootView>
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
}