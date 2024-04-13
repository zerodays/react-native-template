import useToastStore from '@utils/stores/toast-store';
import { AlertCircle, CheckCircle, Info } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from './button';

const Toaster = () => {
  const insets = useSafeAreaInsets();
  const { toast, setToast } = useToastStore();
  const [toastHeight, setToastHeight] = React.useState(300);

  const translateY = useSharedValue(toastHeight);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateY.value > 100) {
        translateY.value = withTiming(
          toastHeight,
          {
            duration: 150,
          },
          () => {
            runOnJS(setToast)(null);
            console.log('dismiss');
          },
        );
      } else {
        translateY.value = withSpring(0);
      }
    });

  /**
   * Animated style for the toast
   */
  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const fadeAnimation = useAnimatedStyle(() => {
    return {
      opacity: 1 - translateY.value / toastHeight,
    };
  });

  useEffect(() => {
    if (toast) {
      translateY.value = withSpring(0);
    }
  }, [toast, translateY]);

  if (!toast) {
    return null;
  }

  return (
    <>
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 12000,
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          fadeAnimation,
        ]}
      />
      <GestureHandlerRootView
        style={{
          zIndex: 12001,
        }}>
        <GestureDetector gesture={gesture}>
          <Animated.View
            className="absolute bottom-0 left-0 right-0 bg-transparent p-6"
            style={[{ paddingBottom: insets.bottom }, translateAnimation]}
            onLayout={(e) => {
              setToastHeight(e.nativeEvent.layout.height);
            }}>
            <View className="min-h-56 rounded-3xl bg-white">
              <View className="my-2 h-1 w-1/6 self-center rounded-full bg-gray-300" />
              <View className="flex items-center gap-y-6 p-6">
                <ToastIcon type={toast.type} />
                <Text className="font-medium text-gray-900">
                  {toast.message}
                </Text>
                <View className="w-full">
                  <Button
                    onPress={() => {
                      translateY.value = withTiming(
                        toastHeight,
                        {
                          duration: 200,
                        },
                        () => {
                          runOnJS(setToast)(null);
                          console.log('Toast dismissed!');
                        },
                      );
                    }}>
                    Dismiss
                  </Button>
                </View>
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </>
  );
};

const ToastIcon = ({ type }: { type: 'error' | 'success' | 'info' }) => {
  switch (type) {
    case 'error':
      return <AlertCircle className="h-12 w-12 text-red-400" />;
    case 'success':
      return <CheckCircle className="h-12 w-12 text-green-400" />;
    case 'info':
      return <Info className="h-12 w-12 text-blue-400" />;
    default:
      return <AlertCircle className="h-12 w-12 text-gray-400" />;
  }
};

export default Toaster;
