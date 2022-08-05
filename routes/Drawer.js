import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground,SafeAreaView} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home_screen';
import TreatmentScreen from "../screens/treatment_screen";
import SplashScreen from "../screens/SplashScreen";
import TreatmentDetails from "../screens/TreatmentDetails";
import DoctorScreen from "../screens/DoctorsListScreen";
import ClinicScreen from "../screens/ClinicListScreen";
import TermsAndConditionScreen from "../screens/TermsAndConditions";
import PackagesDetails from "../screens/PackagesDetails";
import AboutUsScreen from "../screens/AboutUsScreen";
import PackagesScreen from "../screens/PackagesScreen";
import EditUserProfile from "../screens/EditUserProfile";
import AddSubUsers from "../screens/AddSubUser";
import SubUsers from "../screens/SubUsers";
import UserPatientHistory from "../screens/UserPatientHistory";
import UserPackageHistory from "../screens/UserPackageHistory";
import OralTips from "../screens/OralTipsScreen";

import QrScreen from "../screens/QrScreen";
import UserProfile from "../screens/UserProfile";
import Animated , { Extrapolate } from 'react-native-reanimated';
import { textColorBack,textColorWhite } from '../assets/colors/colors';

import { AuthContext } from '../component/context';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fontRegular } from '../assets/font/fonts';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerContent = (props) => {
    const color="#000000"
    const {sign_out , toggleTheme} = React.useContext(AuthContext);

    return (
  
      
      <DrawerContentScrollView {...props} scrollEnabled={false}>
      
         
        <View style={{marginTop:100}}>

        <TouchableOpacity
            style={styles.drawerItemStyle}
            onPress={() => {props.navigation.navigate('Home')}}>
        <Icon 
                name="home" 
                color={textColorBack}
                size={32}
                />
        <Text style={styles.drawerItemText}>Home </Text>

        </TouchableOpacity>  

        <TouchableOpacity
             style={styles.drawerItemStyle}
            onPress={() => {props.navigation.navigate('UserProfile')}}>
        <Icon 
                name="account" 
                color={textColorBack}
                size={24}
                />
        <Text style={styles.drawerItemText}>Profile</Text>

        </TouchableOpacity>  

        <TouchableOpacity
             style={styles.drawerItemStyle}
            onPress={() => {props.navigation.navigate('PackagesScreen')}}>
        <Icon 
                name="book-open" 
                color={textColorBack}
                size={24}
                />
        <Text style={styles.drawerItemText}>Packages</Text>

        </TouchableOpacity>  


        <TouchableOpacity
              style={styles.drawerItemStyle}
            onPress={() => {props.navigation.navigate('DoctorsScreen')}}>
        <Icon 
                name="doctor" 
                color={textColorBack}
                size={24}
                />
        <Text style={styles.drawerItemText}>Our Doctors</Text>

        </TouchableOpacity>  


        <TouchableOpacity
             style={styles.drawerItemStyle}
            onPress={() => {props.navigation.navigate('ClinicScreen')}}>
        <Icon 
                name="hospital-box" 
                color={textColorBack}
                size={24}
                />
        <Text style={styles.drawerItemText}>Clinics</Text>

        </TouchableOpacity>  


        <TouchableOpacity
            style={styles.drawerItemStyle}
            onPress={() => {props.navigation.navigate('QrScreen')}}>
        <Icon 
                name="qrcode" 
                color={textColorBack}
                size={24}
                />
        <Text style={styles.drawerItemText}>QR Code</Text>

        </TouchableOpacity>  


        <TouchableOpacity
            style={styles.drawerItemStyle}
            onPress={() => {props.navigation.navigate('SubUsers')}}>
        <Icon 
                name="account" 
                color={textColorBack}
                size={24}
                />
        <Text style={styles.drawerItemText}>Accounts</Text>

        </TouchableOpacity>  


        <TouchableOpacity
       style={styles.drawerItemStyle}
            onPress={() => {props.navigation.navigate('AboutUsScreen')}}>
        <Icon 
                name="information" 
                color={textColorBack}
                size={24}
                />
        <Text style={styles.drawerItemText}>About Us</Text>

        </TouchableOpacity>  


        <TouchableOpacity
           style={styles.drawerItemStyle}
            onPress={() => {props.navigation.navigate('TermsAndConditionScreen')}}>
        <Icon 
                name="file-document-outline" 
                color={textColorBack}
                size={24}
                />
        <Text style={styles.drawerItemText}>Terms and Conditions</Text>

        </TouchableOpacity>  


        <TouchableOpacity
            style={styles.drawerItemStyle}
            onPress ={() => {sign_out()}}>
        <Icon 
                name="logout" 
                color={textColorBack}
                size={24}
                />
        <Text style={styles.drawerItemText}>Logout</Text>

        </TouchableOpacity>  
      
    
       
    

       
       
         
      </View>
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
              
              </TouchableOpacity>
            ),
          }}>



              <Stack.Screen name="SpashScreen" component={SplashScreen} />     
              <Stack.Screen name="Home" component={Home} />  
              <Stack.Screen name="OralTips" component={OralTips} />  
              <Stack.Screen name="AddSubUsers" component={AddSubUsers} /> 
              <Stack.Screen name="SubUsers" component={SubUsers} /> 
              <Stack.Screen name="UserProfile" component={UserProfile} /> 
              <Stack.Screen name="QrScreen" component={QrScreen} />    
            
           
              <Stack.Screen name="UserPackageHistory" component={UserPackageHistory} />  
              <Stack.Screen name="UserPatientHistory" component={UserPatientHistory} />  
              <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
              <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
              <Stack.Screen name="TermsAndConditionScreen" component={TermsAndConditionScreen} />  
              <Stack.Screen name="PackagesScreen" component={PackagesScreen} /> 
              <Stack.Screen name="PackagesDetailsScreen" component={PackagesDetails} />  
              <Stack.Screen name="ClinicScreen" component={ClinicScreen} />  
              <Stack.Screen name="DoctorsScreen" component={DoctorScreen} />  
            
              <Stack.Screen name="TreatmentScreen" component={TreatmentScreen} />
            
              <Stack.Screen name="TreatmentDetails" component={TreatmentDetails} />
        </Stack.Navigator>
      </Animated.View>
    );
  };


  export default () => {
    const [progress, setProgress] = useState(0);

    const scale = Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [1, 0.7],
    });
    const borderRadius = Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [0, 10],
    });
    const animatedStyle = {borderRadius, transform: [{scale}]};

      return (
        <ImageBackground 
        source={require('../assets/images/menuside.png')} resizeMode="cover" style={{width:'100%',height:'100%'}}
        >
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
              inactiveTintColor: '#000000',
              color:'#000000'
              
            }}

            
            sceneContainerStyle={styles.scene}
            drawerContent={(props) => {
                
                setTimeout(()=>{
                   
                    setProgress(props.progress); 
                })
               
              return <DrawerContent {...props} />;
            }}>
            <Drawer.Screen name="Screens">
              {(props) => <Screens {...props} style={animatedStyle} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        </ImageBackground>
      );
    };
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      drawerItemText: {
        fontFamily:fontRegular,
        fontSize:16,
        marginLeft:16,
        justifyContent:'center'

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
      drawerItemStyle:{
        flexDirection:'row',
        marginLeft:16,
        marginTop:24
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
      drawerStyles: {flex: 1, width: '65%', backgroundColor: 'transparent'},
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