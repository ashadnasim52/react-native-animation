import React, {useState} from 'react';
import {Animated, Button, StyleSheet, Text, View} from 'react-native';

const App4 = () => {
  const value = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const moveBall = () => {
    console.log('move...');
    Animated.timing(value, {
      toValue: {
        x: 100,
        y: 100,
      },
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View>
      <Animated.View style={value.getLayout()}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 25,
            backgroundColor: 'red',
          }}
        />
      </Animated.View>

      <Button title="move" onPress={moveBall} />
    </View>
  );
};

export default App4;

const styles = StyleSheet.create({});
