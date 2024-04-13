import Button from '@components/ui/button';
import { Loading } from '@components/ui/loading';
import { cn } from '@utils/cn';
import { useExampleStore } from '@utils/stores/example-store';
import useToastStore from '@utils/stores/toast-store';
import theme from '@utils/theme';
import { router } from 'expo-router';
import { MinusIcon, PlusIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';

const AuthHomeScreen = () => {
  const { value, increment, decrement } = useExampleStore();
  const { setToast } = useToastStore();

  return (
    <View className="flex flex-1 items-center justify-center gap-y-6">
      <Text
        className={cn(
          'overflow-hidden rounded-2xl border px-6 py-4',
          value > 0 && 'text-red-600',
        )}
        style={{
          backgroundColor: theme.primary[300],
        }}>
        Authenticated Home
      </Text>
      <Text>{value}</Text>
      <Button asChild onPress={() => increment()}>
        <PlusIcon color={theme.black} />
      </Button>
      <Button asChild onPress={() => decrement()}>
        <MinusIcon color={theme.black} />
      </Button>
      <Button onPress={() => router.navigate('(guest)')}>Logout</Button>
      <Loading />
      <Button onPress={() => setToast({ type: 'success', message: 'Hello!' })}>
        Show Toast
      </Button>
    </View>
  );
};

export default AuthHomeScreen;
