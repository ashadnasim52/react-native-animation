// Inspiration: https://dribbble.com/shots/14154226-Rolodex-Scrolling-Animation/attachments/5780833?mode=media
// Photo by Sharefaith from Pexels
// Background image: https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/

import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import faker from 'faker';

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      'women',
      'men',
    ])}/${faker.datatype.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <StatusBar hidden /> */}
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/413195/pexels-photo-413195.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        }}
        style={[StyleSheet.absoluteFillObject]}
        blurRadius={2}
      />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        contentContainerStyle={{
          padding: SPACING,
          // paddingTop: StatusBar.currentHeight || 42,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: scrollY},
              },
            },
          ],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.5),
          ];
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opcity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: 'rgba(255,255,255,0.9)',
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 1,
                transform: [{scale}],
                opacity: opcity,
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '700',
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    opacity: 0.7,
                  }}>
                  {item.jobTitle}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    opacity: 0.8,
                    color: '#0099cc',
                  }}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
