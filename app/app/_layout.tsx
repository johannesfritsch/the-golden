import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo, useRef } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Drawer from '@/components/Drawer';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { trpc } from '@/utils/trpc';
import { httpLink } from '@trpc/client';
import { getAndroidId, getBuildNumber, getDeviceId, getDeviceToken, getDeviceType, getInstanceId, getManufacturer, getSystemName, getSystemVersion, getUniqueId, getVersion, isTablet } from 'react-native-device-info'
import rsa, { Hash } from 'react-native-fast-rsa'
import { appKey } from '@/utils/appKey';
import { LockScreenProvider } from '@/hooks/useLockScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { crc32, decrypt } from 'react-native-ntag-424/src/services/crypto';
import { AppState } from 'react-native';
import Config from "react-native-config";
import { apiBaseUrl } from '@/utils/config';
import { Notifications } from 'react-native-notifications';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const getDecryptedToken = async () => {
  const token = await AsyncStorage.getItem('token');
  const pin = await AsyncStorage.getItem('pin');

  if (token === null || pin === null) return null;

  const decryptionKeyFromPin = crc32(Buffer.from(pin, 'hex'));
  const decryptedToken = token ? decrypt(Buffer.from(token, 'hex'), Buffer.alloc(16), Buffer.concat([decryptionKeyFromPin, decryptionKeyFromPin, decryptionKeyFromPin, decryptionKeyFromPin]), 'aes-128-cbc') : null;
  console.log('------> decryptedToken', decryptedToken?.toString('utf8'));

  if (!(decryptedToken && /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/.test(decryptedToken.toString('utf8').trim()))) {
    return null;
  }

  return decryptedToken;
}

const trpcClient = trpc.createClient({
  links: [
    httpLink({
      // url: 'https://api.thegolden.events/trpc',
      url: `${apiBaseUrl}/trpc`,

      // You can pass any HTTP headers you wish here
      async headers() {
        const uniqueId = await getUniqueId();
        const nowString = new Date().toISOString();
        const encryptedStr = await rsa.encryptOAEP(`${uniqueId} | ${nowString}`, '', Hash.SHA256, appKey);

        const decryptedToken = await getDecryptedToken();

        return {
          ...(decryptedToken ? { 'Authorization': `Bearer ${decryptedToken}` } : {}),
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

  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        AsyncStorage.removeItem('pin');
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, []);

  const queryClient = useMemo(() => new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        router.navigate('/auth/login');
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        router.navigate('/auth/login');
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: false,
      },
    },
  }), []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
        console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
        completion({ alert: false, sound: false, badge: false });
      });

      Notifications.events().registerNotificationOpened((notification, completion) => {
        console.log(`Notification opened: ${notification.payload}`);
        completion();
      });

      Notifications.ios.checkPermissions().then((currentPermissions) => {
        console.log('Badges enabled: ' + !!currentPermissions.badge);
        console.log('Sounds enabled: ' + !!currentPermissions.sound);
        console.log('Alerts enabled: ' + !!currentPermissions.alert);
        console.log('Car Play enabled: ' + !!currentPermissions.carPlay);
        console.log('Critical Alerts enabled: ' + !!currentPermissions.criticalAlert);
        console.log('Provisional enabled: ' + !!currentPermissions.provisional);
        console.log('Provides App Notification Settings enabled: ' + !!currentPermissions.providesAppNotificationSettings);
        console.log('Announcement enabled: ' + !!currentPermissions.announcement);
      });
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  console.log('apiBaseUrl', apiBaseUrl);
  console.log('Config', Config);
  console.log('__DEV__', __DEV__);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            <LockScreenProvider>
              <Drawer>
                <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
                  <Stack.Screen name="(app)/info/productInfo" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                  <Stack.Screen name="(app)/auth/login" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
                </Stack>
              </Drawer>
            </LockScreenProvider>
            {__DEV__ && <DevToolsBubble />}
          </GestureHandlerRootView>
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
}