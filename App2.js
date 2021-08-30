import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
const SIZE = 100.0;
const App2 = () => {
  const translateX = useSharedValue(0);
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: event => {
      console.log(event);
    },
    onActive: event => {
      console.log(event);
      translateX.value = event.translationX;
    },
    onEnd: event => {
      console.log(event);
    },
    onFail: event => {
      console.log(event);
    },
    onFinish: event => {
      console.log(event);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  }, []);
  return (
    <View style={styles.container}>
      <PanGestureHandler {...{panGestureHandler}}>
        <Animated.View style={[styles.square, rStyle]} />
      </PanGestureHandler>
    </View>
  );
};

export default App2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
  },
});
