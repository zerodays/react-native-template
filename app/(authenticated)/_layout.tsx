import { Stack } from 'expo-router';
import { Platform } from 'react-native';

// Only for authenticated users
const AuthenticatedLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
        headerTransparent: true,
        statusBarTranslucent: true,
        statusBarStyle: Platform.OS === 'ios' ? undefined : 'dark',
      }}
    />
  );
};

export default AuthenticatedLayout;
