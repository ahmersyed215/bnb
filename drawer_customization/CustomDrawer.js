import React from 'react';

import {
  Text,
  ImageBackground,
  StyleSheet
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';

import Animated from 'react-native-reanimated';


import { SafeAreaView } from 'react-native-safe-area-context';

const {
  interpolate,
  Extrapolate
} = Animated;

export default props => {
  const { state, progress, navigation } = props;
  const { index, routes } = state;

  const opacity = interpolate(progress, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.1, 1],
    extrapolate: Extrapolate.CLAMP
  });

  return (
    <Animated.View style={[
      styles.container, {
        opacity: opacity
      }]}>

      <SafeAreaView style={styles.imageContainer} edges={['top']}>
        <ImageBackground
          source={require('../assets/images/bblogo.png')}
          style={styles.drawerImage}
          imageStyle={styles.imageStyle}
          resizeMode='cover'
        >
          
        </ImageBackground>
      </SafeAreaView>

      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContentContainerStyle}>
        {routes.map((route, position) => {
          const isFocused = (index === position);

          return (
            <DrawerItem
              key={route.key}
              label={({ focused }) => {
                return (
                  <Text style={focused ? styles.activeText : styles.inactiveText}>
                    {route.name}
                  </Text>
                )
              }}
              style={isFocused ? styles.activeContainer : styles.inActiveContainer}
              onPress={() => navigation.navigate(`${route.name}`)}
              focused={isFocused}
              activeBackgroundColor='transparent'
            />
          )
        })}
      </DrawerContentScrollView>
    </Animated.View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  drawerContentContainerStyle: {
    paddingTop: 0
  },

  imageContainer: {
    alignItems: 'center',
    borderRadius: 16,
    marginVertical: 8
  },

  drawerImage: {
    width: 50,
    height: 50,
  },

  imageStyle: {
    borderRadius: 32
  },

  imageGradient: {
    flex: 1,
    borderRadius: 32
  },

  activeContainer: {
    borderLeftWidth: 16,
    borderLeftColor: '#00b8d4',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginTop: 0
  },

  activeText: {
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'transparent'
  },

  inActiveContainer: {
    borderLeftWidth: 16,
    borderLeftColor: 'transparent',
    backgroundColor: 'transparent',
    borderRadius: 16,
    marginTop: 0
  },

  inactiveText: {
    fontWeight: 'bold',
    color: '#ff00ff',
    backgroundColor: 'transparent'
  }
});