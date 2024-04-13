import type { PropsWithChildren } from 'react';
import type { FieldError } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Text, View } from 'react-native';

/**
 * A form validation error component that uses react-hook-form under the hood.
 * @example
 * <FormTextInput<ChangePasswordForm>
 *   name="oldPassword"
 *   textContentType="password"
 *   label={t('auth:oldPassword')}
 *   secureTextEntry
 * />
 *  <View className="absolute right-0 top-0">
 *    <ValidationError name="oldPassword" tiny />
 *  </View>
 * </FormProvider>;
 */
const ValidationError = ({ name, tiny }: { name: string; tiny?: boolean }) => {
  const { t } = useTranslation();
  const form = useFormContext();

  if (!form.formState.errors[name]) {
    return null;
  }

  let message = form.formState.errors[name]?.message;

  if (!message && Array.isArray(form.formState.errors[name])) {
    const array = form.formState.errors[name] as unknown as FieldError[];
    message = array.find((error) => !!error)?.message;
  }

  if (tiny) {
    return (
      <Text
        style={{
          fontSize: 11,
        }}
        className="font-xs text-sm text-rose-400">
        * {t(message as string)}
      </Text>
    );
  }

  return (
    <View className="my-3 flex h-6 items-center">
      <Text className="font-medium text-sm text-rose-400">
        * {t(message as string)}
      </Text>
    </View>
  );
};

interface WithValidationErrorProps extends PropsWithChildren {
  name: string;
}

export const WithValidationError = ({
  name,
  children,
}: WithValidationErrorProps) => {
  return (
    <View className="flex-1">
      <View className="flex-1">{children}</View>
      <ValidationError name={name} />
    </View>
  );
};

export default ValidationError;
