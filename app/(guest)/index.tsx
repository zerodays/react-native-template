import Button from '@components/ui/button';
import Routes from '@utils/routes';
import theme from '@utils/theme';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

const GuestHomeScreen = () => {
  const { t, i18n } = useTranslation('common');

  const handleLanguageChange = async (languageCode: string) => {
    await i18n.changeLanguage(languageCode);
  };

  return (
    <View className="flex flex-1 items-center justify-center gap-y-4 bg-gray-100">
      <Text
        style={{
          color: theme.primary[400],
        }}>
        Guest Home Screen
      </Text>
      <Text>{t('helloWorld')}</Text>
      <Button
        variant="default"
        onPress={() => router.navigate(Routes.auth.index)}>
        Login
      </Button>

      <Button variant="filled" onPress={() => handleLanguageChange('en')}>
        Change Language 🇬🇧
      </Button>

      <Button variant="filled" onPress={() => handleLanguageChange('sl')}>
        Change Language 🇸🇮
      </Button>

      <Button
        variant="danger"
        onPress={() => alert('You just performed a dangerous action!')}>
        Dangerous Button
      </Button>
      <Button
        onPress={() => {
          throw new Error('Hello, again, Sentry!');
        }}>
        Throw Error
      </Button>
    </View>
  );
};

export default GuestHomeScreen;
