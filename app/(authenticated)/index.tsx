import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

const AuthHomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Authenticated Home</Text>
      <Button title="Logout" onPress={() => router.navigate('(guest)')} />
    </View>
  );
};

export default AuthHomeScreen;
