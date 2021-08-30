import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Animated,
  Image,
  Dimensions,
} from 'react-native';

const images = {
  man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids: 'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help: 'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map(i => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}));

const {width, height} = Dimensions.get('screen');

const Tab = React.forwardRef(({item}, ref) => {
  return (
    <View ref={ref}>
      <Text
        style={{
          color: 'white',
          fontSize: 84 / data.length,
          textTransform: 'uppercase',
        }}>
        {item.title}
      </Text>
    </View>
  );
});
const Indiactor = () => {
  return (
    <View
      style={{
        position: 'absolute',
        width: 100,
        height: 4,
        backgroundColor: 'white',
        bottom: -10,
      }}></View>
  );
};

const Tabs = ({scrollX, data}) => {
  const containerRef = React.useRef();
  React.useEffect(() => {
    data.forEach(item => {
      item.ref.current.measureLayout(containerRef.current);
    });
  }, []);
  return (
    <View
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 100,
        width,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          // backgroundColor: 'red',
        }}>
        {data.map(item => {
          return <Tab key={item.key} item={item} ref={item.ref} />;
        })}
      </View>
      <Indiactor />
    </View>
  );
};

export default function App() {
  const xScrollX = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    StatusBar.setHidden(true, 'none');
  }, []);
  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Animated.FlatList
          data={data}
          keyExtractor={item => item.key}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: xScrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          renderItem={({item}) => {
            console.log({item});
            return (
              <View style={{width, height: height}}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    flex: 1,
                    resizeMode: 'cover',
                  }}
                />
              </View>
            );
          }}
        />
        <Tabs scrollX={xScrollX} data={data} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
