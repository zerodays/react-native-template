// Sentry.init({
//   dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
//   debug: true,
//   environment: process.env.EXPO_PUBLIC_SENTRY_ENV,
// });

import { FontSource, useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import '../global.css';
import '../i18n/config';

// Keep splash screen visible while we fetch fonts and other assets
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    thin: require('../assets/fonts/Inter-Thin.ttf') as FontSource,
    light: require('../assets/fonts/Inter-Light.ttf') as FontSource,
    regular: require('../assets/fonts/Inter-Regular.ttf') as FontSource,
    medium: require('../assets/fonts/Inter-Medium.ttf') as FontSource,
    bold: require('../assets/fonts/Inter-Bold.ttf') as FontSource,
    black: require('../assets/fonts/Inter-Black.ttf') as FontSource,
    semibold: require('../assets/fonts/Inter-SemiBold.ttf') as FontSource,
    extrabold: require('../assets/fonts/Inter-ExtraBold.ttf') as FontSource,
    extralight: require('../assets/fonts/Inter-ExtraLight.ttf') as FontSource,
  });

  useEffect(() => {
    if (loaded) {
      // Hide splash when fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <Slot />;
};

export default RootLayout;
