import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home_screen';
import TreatmentScreen from "../screens/treatment_screen";
import TreatmentDetails from "../screens/TreatmentDetails";
import Animated from 'react-native-reanimated';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <DrawerItem
          label="Home2"
          labelStyle={styles.drawerLblStyle}
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          label="About"
          labelStyle={styles.drawerLblStyle}
          onPress={() => props.navigation.navigate('About')}
        />
        <DrawerItem
          label="Settings"
          labelStyle={styles.drawerLblStyle}
          onPress={() => props.navigation.navigate('Settings')}
        />
      </DrawerContentScrollView>
    );
  };
  const Screens = ({navigation, style}) => {
    return (
      <Animated.View style={[styles.stack, style]}>
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTitle: null,
            headerLeft: () => (
              <TouchableOpacity onPress={navigation.openDrawer}>
                <Image
               
                  style={styles.menu}
                />
              </TouchableOpacity>
            ),
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TreatmentScreen" component={TreatmentScreen} />
          <Stack.Screen name="TreatmentDetails" component={TreatmentDetails} />
        </Stack.Navigator>
      </Animated.View>
    );
  };
  export default () => {
    const [progress, setProgress] = useState(new Animated.Value(0));
    const scale = Animated.interpolateNode(progress, {
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    });
    const borderRadius = Animated.interpolateNode(progress, {
      inputRange: [0, 1],
      outputRange: [0, 10],
    });
    const animatedStyle = {borderRadius, transform: [{scale}]};
    return (
   
        <Drawer.Navigator
          backBehavior="none"
          initialRouteName="Home"
          drawerType="slide"
          overlayColor="transparent"
          drawerStyle={styles.drawerStyles}
          contentContainerStyle={styles.container}
          drawerContentOptions={{
            activeBackgroundColor: 'transparent',
            activeTintColor: 'white',
            inactiveTintColor: 'white',
          }}
          sceneContainerStyle={styles.scene}
          drawerContent={(props) => {
            setProgress(props.progress);
            return <DrawerContent {...props} />;
          }}>
          <Drawer.Screen name="Screens">
            {(props) => <Screens {...props} style={animatedStyle} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scene: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
  
      elevation: 24,
      backgroundColor: 'transparent',
    },
    stack: {
      flex: 1,
      shadowColor: '#FFF',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 5,
      overflow: 'hidden',
    },
    drawerStyles: {flex: 1, width: '50%', backgroundColor: 'transparent'},
    menu: {
      width: 38,
      height: 38,
      margin: 20,
    },
    drawerLblStyle: {
      fontWeight: '500',
      fontSize: 20,
    },
  });