import theme from '@utils/theme';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'react-native';

const GuestHomeScreen = () => {
  const { t, i18n } = useTranslation('common');

  const handleLanguageChange = async (languageCode: string) => {
    await i18n.changeLanguage(languageCode);
  };

  return (
    <View className="flex flex-1 items-center justify-center bg-red-300">
      <Text
        style={{
          color: theme.primary[400],
        }}>
        Guest Home Screen
      </Text>
      <Text>{t('helloWorld')}</Text>
      <Button
        title="Login"
        onPress={() => router.navigate('(authenticated)')}
      />
      <Button
        title="Change Language"
        onPress={() =>
          handleLanguageChange(i18n.language === 'en' ? 'sl' : 'en')
        }
      />
    </View>
  );
};

export default GuestHomeScreen;
