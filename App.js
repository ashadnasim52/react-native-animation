import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';
const SIZE = 100.0;
export const App = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);
  const reAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {scale: scale.value},
        {
          rotate: `${progress.value * 2 * Math.PI}rad`,
        },
      ],
      borderRadius: (progress.value * SIZE) / 2,
    };
  }, []);
  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            height: SIZE,
            width: SIZE,
            backgroundColor: 'blue',
          },
          reAnimatedStyle,
        ]}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
