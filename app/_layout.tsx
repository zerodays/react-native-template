import Toaster from '@components/ui/toaster';
import * as Sentry from '@sentry/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useCustomFonts from '@utils/hooks/use-custom-fonts';
import '@utils/i18n/config';
import { ApiProvider } from '@utils/providers/api-provider';
import { isRunningInExpoGo } from 'expo';
import { Slot, SplashScreen, useNavigationContainerRef } from 'expo-router';
import { useEffect } from 'react';
import '../global.css';

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

Sentry.init({
  debug: true,
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  environment: process.env.EXPO_PUBLIC_SENTRY_ENV,
  integrations: [navigationIntegration],
  enableNativeFramesTracking: !isRunningInExpoGo(),
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
      navigationIntegration.registerNavigationContainer(ref);
    }
  }, [ref]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <Slot />
        <Toaster />
      </ApiProvider>
    </QueryClientProvider>
  );
};

export default Sentry.wrap(RootLayout);
