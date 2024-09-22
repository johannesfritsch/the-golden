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
import { httpLink } from '@trpc/client';
import { getAndroidId, getBuildNumber, getDeviceId, getDeviceToken, getDeviceType, getInstanceId, getManufacturer, getSystemName, getSystemVersion, getUniqueId, getVersion, isTablet } from 'react-native-device-info'
import rsa, { Hash } from 'react-native-fast-rsa'
import { appKey } from '@/utils/appKey';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpLink({
      // url: 'https://api.thegolden.events/trpc',
      url: 'http://192.168.0.142:4000/trpc',
      // You can pass any HTTP headers you wish here
      async headers() {
        const uniqueId = await getUniqueId();
        const nowString = new Date().toISOString();
        const encryptedStr = await rsa.encryptOAEP(`${uniqueId} | ${nowString}`, '', Hash.SHA256, appKey);

        return {
          'x-unique-id': uniqueId,
          'x-device-time': nowString,
          'x-device-sign': encryptedStr,
          'x-device-id': getDeviceId(),
          'x-build-version': getVersion(),
          'x-build-number': getBuildNumber(),
          'x-instance-id': await getInstanceId(),
          'x-android-id': await getAndroidId(),
          'x-device-token': await getDeviceToken().catch(() => 'unknown'),
          'x-manufacturer': await getManufacturer(),
          'x-system-name': getSystemName(),
          'x-system-version': getSystemVersion(),
          'x-is-tablet': isTablet() ? 'true' : 'false',
          'x-device-type': await getDeviceType(),
          'x-build-type': __DEV__ ? 'development' : 'production',
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