import { useExampleStore } from '@utils/stores/example-store';
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
      <Text>Authenticated Home</Text>
      <Text>{value}</Text>
      <Button title="Increment" onPress={() => increment()} />
      <Button title="Decrement" onPress={() => decrement()} />
      <Button title="Logout" onPress={() => router.navigate('(guest)')} />
    </View>
  );
};

export default AuthHomeScreen;
