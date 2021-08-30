import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Circle = ({onPress}) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, style.circleContainer]}>
      <View style={[styles.circle]}></View>
    </View>
  );
};

const App6 = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default App6;

const styles = StyleSheet.create({});
