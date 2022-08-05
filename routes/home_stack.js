import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerContent } from "../drawer_customization/drawer_content";
import { createDrawerNavigator,  DrawerContentScrollView,DrawerItem, } from '@react-navigation/drawer';
import Login from "../screens/loginScreen";
import Signup from "../screens/signupScreen";
import Loading from "../screens/loading_screen";
import Animated from 'react-native-reanimated'; 
import Home from "../screens/home_screen";
import TreatmentScreen from "../screens/treatment_screen";
import TreatmentDetails from "../screens/TreatmentDetails";
import SectionSelectionScreen from "../screens/SectionSelectionScreen";
import SectionDetails from "../screens/SectionDetails";
import SplashScreenAuth from "../screens/SplashScreenAuth";
import LogsScreen from "../screens/logsScreen";
import { global_style } from "../styles/global_styles";

const authStack = createStackNavigator();
const AuthStackSreens = () =>(
  <authStack.Navigator  
  screenOptions={
    {
      headerTitleAlign: 'center',  
      headerShown:false
  }
} 
  >

<authStack.Screen name="SplashScreenAuth" component={SplashScreenAuth} />
<authStack.Screen name="Login" component={Login} />    
<authStack.Screen name="Signup" component={Signup} />
<authStack.Screen name="Loading" component={Loading} />
   
  </authStack.Navigator>
);

export const AuthNavigator = () => (  
 <AuthStackSreens/> 
);



