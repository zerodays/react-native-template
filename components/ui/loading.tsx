import LottieLoader from '@assets/lottie/loader.json';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface LoadingProps {
  message?: string;
  nativeLoader?: boolean;
}

export const Loading = ({ message, nativeLoader = false }: LoadingProps) => {
  return (
    <View className="flex items-center justify-center gap-y-2">
      {nativeLoader ? (
        <ActivityIndicator size="large" />
      ) : (
        <LottieView
          autoPlay
          style={{
            width: '60%',
            aspectRatio: 1,
          }}
          source={LottieLoader}
        />
      )}
      {message && <Text>{message}</Text>}
    </View>
  );
};
