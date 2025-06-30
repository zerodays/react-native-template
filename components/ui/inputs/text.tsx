import type { FieldValues, Path } from 'react-hook-form';
import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';

import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react-native';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type TextInputParams = {
  answerType: 'text' | 'number' | 'multiline-text';
};

interface FormTextInputProps<TFieldValues extends FieldValues>
  extends Omit<TextInputProps, 'style'> {
  name: Path<TFieldValues>;
  label?: string;
  icon?: LucideIcon;
  params?: TextInputParams;
  displayMode?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A form text input component that uses react-hook-form under the hood.
 * It automatically derives form values based on <FormProvider> context.
 * @example
 * <FromProvider {...form}>
 *  <FormTextInput<SampleForm> name="email" label="Email" />
 * </FormProvider>
 */
export default function FormTextInput<TFieldValues extends FieldValues>({
  name,
  label,
  icon,
  displayMode,
  params,
  style,
  ...rest
}: FormTextInputProps<TFieldValues>) {
  const form = useFormContext<TFieldValues>();
  const ref = useRef<TextInput>(null);

  const Icon = icon;
  const isMultiline =
    params?.answerType === 'multiline-text' || params?.answerType === 'text';
  const isExpanded = params?.answerType === 'multiline-text';

  return (
    <View style={style}>
      <Controller
        control={form.control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TouchableOpacity
            className="flex max-h-full"
            activeOpacity={1}
            onPress={() => ref.current?.focus()}>
            {label && (
              <Text className="mb-1.5 text-xs text-slate-400">{label}</Text>
            )}
            <View className="flex flex-row items-center justify-start space-x-2 rounded-2xl border border-slate-400 bg-white p-3 text-slate-700">
              {Icon && (
                <Icon className="text-slate-400" height={16} width={16} />
              )}
              <TextInput
                ref={ref}
                keyboardType={
                  params?.answerType === 'number' ? 'numeric' : 'default'
                }
                onBlur={onBlur}
                multiline={isMultiline}
                scrollEnabled={false}
                editable={!displayMode}
                textAlignVertical={isExpanded ? 'top' : 'center'}
                className={clsx(
                  'grow pt-0',
                  isExpanded ? 'min-h-[160px]' : 'h-auto',
                )}
                autoCapitalize={rest.autoCapitalize ?? 'none'}
                onChangeText={onChange}
                value={value}
                {...rest}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
