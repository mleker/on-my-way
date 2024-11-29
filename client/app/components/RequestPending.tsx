import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

interface IRequestPending {
  onDriverMatched: () => void;
  onCancel: () => void;
}

const RequestPending: React.FC<IRequestPending> = ({ onDriverMatched, onCancel }) => {
  const spinAnim = useRef(new Animated.Value(0)).current; // Animation state
  const scaleAnim = useRef(new Animated.Value(1)).current; // Animation state for pulsing

  useEffect(() => {
    // Spin animation
    const spin = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000, // Full rotation in 2 seconds
        useNativeDriver: true,
      })
    );

    // Scale animation (for pulsing effect)
    const scale = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    spin.start();
    scale.start();

    // Timeout for driver matching
    const timeoutId = setTimeout(() => {
      onDriverMatched();
      spin.stop();
      scale.stop();
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      spin.stop();
      scale.stop();
    };
  }, [onDriverMatched, spinAnim, scaleAnim]);

  // Interpolating spin animation to rotate
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Full circle
  });

  return (
    <View className="flex flex-grow items-center justify-center bg-white m-4">
      <View className="flex flex-grow items-center">
        <Text className="text-xl font-bold text-center mt-32 mb-12">
          Searching for a driver...
        </Text>

        {/* Animated Loader */}
        <View className="relative">
          {/* Outer rotating circle */}
          <Animated.View
            style={{
              transform: [{ rotate: spin }],
            }}
            className="w-16 h-16 border-4 border-black rounded-full"
          />

          {/* Inner pulsing circle */}
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
            }}
            className="absolute w-8 h-8 bg-black rounded-full top-4 left-4"
          />
        </View>
      </View>

      {/* Cancel Button */}
      <TouchableOpacity
        className="flex w-full border-red-500 border-solid border-4 p-4 self-end items-center"
        onPress={onCancel}
      >
        <Text className="text-red-500 font-bold text-base">CANCEL REQUEST</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequestPending;
