import Button from '@components/ui/button';
import { Loading } from '@components/ui/loading';
import { cn } from '@utils/cn';
import Routes from '@utils/routes';
import { useExampleStore } from '@utils/stores/example-store';
import useToastStore from '@utils/stores/toast-store';
import theme from '@utils/theme';
import { useGetRandomFact } from 'api/generated/endpoints';
import { router } from 'expo-router';
import { MinusIcon, PlusIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';

const AuthHomeScreen = () => {
  const { value, increment, decrement } = useExampleStore();
  const { setToast } = useToastStore();

  const { data, isLoading, error, refetch, isFetching } = useGetRandomFact({
    max_length: 140,
  });

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
      <View className="w-full flex-row items-center justify-evenly">
        <Button asChild onPress={() => increment()}>
          <PlusIcon color={theme.black} />
        </Button>
        <Text className="min-w-10 text-center font-bold text-3xl">{value}</Text>
        <Button asChild onPress={() => decrement()}>
          <MinusIcon color={theme.black} />
        </Button>
      </View>
      <View className="gap-y-3 px-10 py-4">
        <Text className="font-bold">Random Cat Fact</Text>
        {isLoading ? (
          <Loading message="Fetching a cat fact..." />
        ) : error ? (
          <Text className="text-red-600">Unable to load a cat fact.</Text>
        ) : (
          <Text className="min-h-24 text-gray-800">{data?.data?.fact}</Text>
        )}
        <Button onPress={() => refetch()} loading={isFetching} variant="filled">
          New fact
        </Button>
      </View>
      <Button onPress={() => router.navigate(Routes.guest.index)}>
        Logout
      </Button>
      <Button onPress={() => setToast({ type: 'success', message: 'Hello!' })}>
        Show Toast
      </Button>
    </View>
  );
};

export default AuthHomeScreen;
