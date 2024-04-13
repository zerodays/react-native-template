// Sentry.init({
//   dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
//   debug: true,
//   environment: process.env.EXPO_PUBLIC_SENTRY_ENV,
// });

import Toaster from '@components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useCustomFonts from '@utils/hooks/use-custom-fonts';
import '@utils/i18n/config';
import { Slot, SplashScreen } from 'expo-router';
import '../global.css';

const queryClient = new QueryClient();

// Keep splash screen visible while we fetch fonts and other assets
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, fontError] = useCustomFonts({
    callback: async () => {
      await SplashScreen.hideAsync();
    },
  });

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

export default RootLayout;
