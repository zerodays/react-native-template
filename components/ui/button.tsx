import { cn } from '@utils/cn';
import theme from '@utils/theme';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface VariantProps {
  container: string;
  text: string;
  icon?: string;
}

// You should edit these variants to match your design spirit
// Adding using cn('') provides auto-sorting of tailwind classes on save
// Tailwind typesafety is also supported in variants objects (with .vscode/settings.json)
const variants = {
  default: {
    container: cn('rounded-2xl border border-gray-400 bg-slate-300 px-4 py-4'),
    text: cn('font-bold text-gray-800'),
    icon: cn('text-gray-800'),
  },
  filled: {
    container: cn('rounded-2xl bg-sky-500 px-4 py-4'),
    text: cn('font-bold text-white'),
    icon: cn('text-white'),
  },
  danger: {
    container: cn('rounded-2xl bg-red-400 px-4 py-4'),
    text: cn('font-bold text-white'),
    icon: cn('text-white'),
  },
} satisfies Record<string, VariantProps>;

const getVariant = (variant: keyof typeof variants) => variants[variant];

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onPress?: () => void;
  variant?: keyof typeof variants;
  loading?: boolean;
  disabled?: boolean;
  fitted?: boolean;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  feedbackText?: string;

  // Don't wrap with text component
  asChild?: boolean;
}

const Button = ({
  children,
  className,
  onPress,
  variant = 'default',
  loading = false,
  disabled = false,
  fitted = false,
  iconLeft,
  iconRight,
  feedbackText,
  asChild,
  ...rest
}: ButtonProps) => {
  const { container, text, icon } = getVariant(variant);

  // Shared value for animation
  const feedbackOpacity = useSharedValue(0);
  const feedbackTranslateY = useSharedValue(30);

  const handlePress = () => {
    feedbackOpacity.value = withSequence(
      withTiming(1, { duration: 300 }),
      withTiming(0, { duration: 1000 }, () => {
        feedbackTranslateY.value = 30;
      }),
    );
    feedbackTranslateY.value = withTiming(0, { duration: 300 });

    onPress?.();
  };

  const feedbackStyle = useAnimatedStyle(() => ({
    opacity: feedbackOpacity.value,
    transform: [{ translateY: feedbackTranslateY.value }],
  }));

  const childStyle = useAnimatedStyle(() => ({
    opacity: 1 - feedbackOpacity.value,
    transform: [{ translateY: feedbackTranslateY.value - 30 }],
  }));

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={loading || disabled}
      activeOpacity={0.5}
      className={clsx(
        container,
        'flex justify-center overflow-hidden',
        fitted && 'self-baseline',
        disabled && 'opacity-50',
        className,
      )}
      {...rest}>
      {/* You could add a gradient background to the button by uncommenting the code below */}
      {/* {variant === 'filled' && (
        <LinearGradient
          className="absolute bottom-0 left-0 right-0 top-0 opacity-70"
          start={[0, 0]}
          end={[1, 0]}
          colors={[theme.primary[600], theme.primary[500]]}
        />
      )} */}

      {loading && (
        <View className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center">
          <ActivityIndicator
            size="small"
            color={variant === 'danger' ? theme.red[500] : theme.primary[500]}
          />
        </View>
      )}

      <View
        className={clsx(
          'flex-row items-center justify-center',
          fitted && 'self-baseline',
          className,
        )}>
        {iconLeft &&
          React.createElement(iconLeft, {
            size: 18,
            className: clsx(icon, 'mr-2'),
          })}
        <Animated.View style={feedbackText ? childStyle : undefined}>
          {asChild ? (
            children
          ) : (
            <Text className={clsx(text, 'text-center')}>{children}</Text>
          )}
        </Animated.View>
        {feedbackText && (
          <Animated.View
            className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
            style={[feedbackStyle, { position: 'absolute', bottom: 0 }]}>
            <Text className={clsx(text, 'text-center')}>{feedbackText}</Text>
          </Animated.View>
        )}
        {iconRight &&
          React.createElement(iconRight, {
            size: 18,
            className: clsx(icon, 'ml-2'),
          })}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
