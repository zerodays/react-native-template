import Toaster from '@components/ui/toaster';
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useCustomFonts from '@utils/hooks/use-custom-fonts';
import '@utils/i18n/config';
import Constants from 'expo-constants';
import { Slot, SplashScreen, useNavigationContainerRef } from 'expo-router';
import { useEffect } from 'react';
import '../global.css';

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  debug: true,
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  environment: process.env.EXPO_PUBLIC_SENTRY_ENV,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      enableNativeFramesTracking: Constants.appOwnership !== 'expo', // Only in native builds, not in Expo Go.
    }),
  ],
});

const queryClient = new QueryClient();

// Keep splash screen visible while we fetch fonts and other assets
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, fontError] = useCustomFonts({
    callback: async () => {
      await SplashScreen.hideAsync();
    },
  });

  // Capture the NavigationContainer ref and register it with the instrumentation.
  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <Toaster />
    </QueryClientProvider>
  );
};

export default Sentry.wrap(RootLayout);
