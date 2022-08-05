import React from 'react';

import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Image
} from 'react-native';


import {
  createDrawerNavigator
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import Animated from 'react-native-reanimated';


import Screen from './Screen';

import CustomDrawer from './CustomDrawer';

import { stackScreens } from './services';

const {
  interpolate,
  Extrapolate
} = Animated;

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
let screenStyle = null;


const AnimateStackOnDrawerToggle = () => {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/images/bblogo.png')}
        resizeMode='cover'
      >
        <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />
        <View style={styles.transparentView}>
         
            <Drawer.Navigator
              drawerType='back'
  
              overlayColor='transparent'
  
              screenOptions={{
                headerShown: false,
                headerTitleAlign: 'center',
                headerStyle: {
                backgroundColor: '#009387',
                }
            }} 

              sceneContainerStyle={styles.sceneContainerStyle}
  
              drawerStyle={styles.drawerStyle}
  
              drawerContent={props => {
                const scale = interpolate(props.progress, {
                  inputRange: [0, 1],
                  outputRange: [1, 0.85],
                  extrapolate: Extrapolate.CLAMP
                });
  
                const borderRadius = interpolate(props.progress, {
                  inputRange: [0, 1],
                  outputRange: [0, 20],
                  extrapolate: Extrapolate.CLAMP
                });
  
                screenStyle = {
                  transform: [{
                    scaleY: scale
                  }],
                  borderRadius
                };
  
                return <CustomDrawer {...props} />;
              }}
            >
              {stackScreens.map(screen => {
                return (
                  <Drawer.Screen key={screen.id} name={screen.name}>
                    {props => <Screen item={screen} {...props} style={{ ...screenStyle }} />}
                  </Drawer.Screen>
                )
              })}
            </Drawer.Navigator>
          
        </View>
      </ImageBackground>
    )
  };
  
  const styles = StyleSheet.create({
    backgroundImage: {
      width: '100%',
      height: '100%'
    },
  
    transparentView: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,0.75)'
    },
  
    drawerStyle: {
      backgroundColor: 'transparent',
      width: '55%'
    },
  
    sceneContainerStyle: {
      backgroundColor: 'transparent'
    }
  });
  
  export default AnimateStackOnDrawerToggle;