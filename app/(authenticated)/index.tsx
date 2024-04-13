import { cn } from '@utils/cn';
import { useExampleStore } from '@utils/stores/example-store';
import theme from '@utils/theme';
import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

const AuthHomeScreen = () => {
  const { value, increment, decrement } = useExampleStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        className={cn('text-blue-600', value > 0 && 'bg-red-600')}
        style={{
          backgroundColor: value > 5 ? 'red' : theme.primary[500],
        }}>
        Authenticated Home
      </Text>
      <Text>{value}</Text>
      <Button title="Increment" onPress={() => increment()} />
      <Button title="Decrement" onPress={() => decrement()} />
      <Button title="Logout" onPress={() => router.navigate('(guest)')} />
    </View>
  );
};

export default AuthHomeScreen;
