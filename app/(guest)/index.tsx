import theme from '@utils/theme';
import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

const GuestHomeScreen = () => {
  return (
    <View className="flex flex-1 items-center justify-center bg-red-300">
      <Text
        style={{
          color: theme.primary[400],
        }}>
        Guest Home Screen
      </Text>
      <Button
        title="Login"
        onPress={() => router.navigate('(authenticated)')}
      />
    </View>
  );
};

export default GuestHomeScreen;
