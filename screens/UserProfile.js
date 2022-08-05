import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator,Linking } from 'react-native';
import {global_style} from '../styles/global_styles'
import QrItem from '../component/qrList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../model/config';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreens from '../component/HeaderScreens';
import axios from 'axios';
import { fontRegular, fontBold,fontHeader } from '../assets/font/fonts';
import PackagesListHomeScreen from '../component/packagesListHomeScreen';
import HomeScreenItems from '../component/homeScreenItems';

import { endPoint, getPackagesExtension,getSocialMediaLinksExtension,getUserDetailsExtension, title } from '../assets/strings/strings';
import { packageBg ,textColorWhite } from '../assets/colors/colors';

import Animated, { Extrapolate } from 'react-native-reanimated';
import { useDrawerProgress } from '@react-navigation/drawer';

export default function App({navigation,drawerAnimationStyle}) {

  const [loading, isLoading] = React.useState(false);


  const [name, setName] = React.useState("");


  const [profileData, setProfileData] = React.useState({
    patientNumber:'',
    email:'',
    phoneNumber:'',
    secondNumber:'',
    dateOfBirth:'',
    address:'',
    packageName:'',
    subscriptionDate: '',
    subscriptionExpiry: '',
    Username:''
    
});

var res="";
const [packageName,setPackageName]= React.useState("")
const [subscriptionDate,setSubscriptionDate]= React.useState("")
const [subscriptionExpiry,setSubscriptionExpiry]= React.useState("")

  const getUserDetails = () =>{
    axios.get(endPoint+getUserDetailsExtension+params,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
        isLoading(false)
    
     
      setName(response.data[0].FirstName+" "+response.data[0].LastName)
      res=response.data[0]
      console.log("res:"+res)
      //console.log(response.data[0]);
      setProfileData({
        ...profileData,
        patientNumber:response.data[0].PatientNumber,
        email:response.data[0].Email,
        Username:response.data[0].Username,
        phoneNumber:response.data[0].Phone,
        secondNumber:response.data[0].SecondaryPhone ,
        dateOfBirth:(response.data[0].DOB).split('T',1),
        address:response.data[0].Address ,
       
    })
    setPackageName(response.data[0].PackageName)
    setSubscriptionDate(response.data[0].SubscriptionDate)
    setSubscriptionExpiry(response.data[0].SubscriptionExpiry)

    if(response.data[0].PackageName==null || response.data[0].PackageName==""){
        setPackageName("No Package Subscribed")
    }
    if(response.data[0].SubscriptionDate==null || response.data[0].SubscriptionDate==""){
      setSubscriptionDate("Confirmation Pending")
    }
    if(response.data[0].SubscriptionExpiry==null || response.data[0].SubscriptionExpiry==""){
      setSubscriptionExpiry("Confirmation Pending")
    
    }

    console.log(profileData)
    console.log(packageName)
    
      })
      
      .catch(function(error) {
      isLoading(false)
      console.log(error);
      
      });
      
      
  }

  var params


  useEffect(()  => {
    async function initialiseValues() {
      try {
        user_token = await AsyncStorage.getItem('user_token');
        params="?PatientNumber="+user_token
        getUserDetails()
      } catch(e) {
        user_token=""
      }
      console.log(user_token)
    }
    console.log("Calling API")
    isLoading(true)
    initialiseValues()
  
  }, []);

 
  const editProfile = () => {
    console.log("Sending RES:"+res)
    navigation.navigate('EditUserProfile',res)
   }


   const packageHistory = () => {
    navigation.navigate('UserPackageHistory')
   }


   const patientHistory = () => {
    navigation.navigate('UserPatientHistory',profileData)
   }


  if(loading) {
    return (
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <ActivityIndicator size="large" color="#0000ff"/>
         </View>
    )
   }
   const pressHandlerBack = () => {
    console.log("im pressed")
    navigation.goBack()
   }
  return (
    
    
    <SafeAreaView style={styles.container}>
    <ScrollView>
   
    <HeaderScreens title={title} pressHandler={pressHandlerBack} navigation={navigation}/>

    <View style={{flexDirection:"row" , justifyContent:'space-around'}}>

    <Text style={styles.nameStyle}>{name}</Text>
    <TouchableOpacity
     onPress={()=> editProfile()}>
    <Text style={styles.nameStyleTwo}>EDIT PROFILE</Text>
    </TouchableOpacity>
    </View>   

    <View style={{flexDirection:"row"}}>
    <Text style={styles.profileDetails}>Patient Number</Text>
    <Text style={styles.profileText}>{profileData.patientNumber}</Text>
    </View>

    
    <View style={{flexDirection:"row"}}>
    <Text style={styles.profileDetails}>Email</Text>
    <Text style={styles.profileText}>{profileData.Username}</Text>
    </View>

    <View style={{flexDirection:"row"}}>
    <Text style={styles.profileDetails}>Phone Number</Text>
    <Text style={styles.profileText}>{profileData.phoneNumber}</Text>
    </View>
    <View style={{flexDirection:"row"}}>
    <Text style={styles.profileDetails}>Secondary Phone Number</Text>
    <Text style={styles.profileText}>{profileData.SecondaryPhone}</Text>
    </View>

    <View style={{flexDirection:"row"}}>
    <Text style={styles.profileDetails}>Date of Birth</Text>
    <Text style={styles.profileText}>{profileData.dateOfBirth}</Text>
    </View>

    <View style={{flexDirection:"row"}}>
    <Text style={styles.profileDetails}>Address</Text>
    <Text style={styles.profileText}>{profileData.address}</Text>
    </View>

    <View style={{flexDirection:"row"}}>
    <Text style={styles.profileDetails}>Package Name</Text>
    <Text style={(packageName=="No Package Subscribed") ? styles.profileTextRed : styles.profileText}>{packageName}</Text>
    </View>

    <View style={{flexDirection:"row"}}>
    <Text style={styles.profileDetails}>Subscription Date</Text>
    <Text style={(subscriptionDate=="Confirmation Pending") ? styles.profileTextRed : styles.profileText}>{subscriptionDate}</Text>
    </View>

    <View style={{flexDirection:"row"}}>
    <Text style={styles.profileDetails}>Subscription Expiry</Text>
    <Text style={(subscriptionExpiry=="Confirmation Pending") ? styles.profileTextRed : styles.profileText}>{subscriptionExpiry}</Text>
    </View>

    <TouchableOpacity
     onPress={()=> patientHistory()}>
    <Text style={styles.nameStyleTwo}>VIEW PATIENT HISTORY</Text>
    </TouchableOpacity>

    <TouchableOpacity
     onPress={()=> packageHistory()}>
    <Text style={styles.nameStyleTwo}>VIEW PACKAGE HISTORY</Text>
    </TouchableOpacity>
    
    </ScrollView>
    </SafeAreaView>
   
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:8,
    backgroundColor:'#ffffff'
  },
  nameStyle:{
    marginLeft:16,
    fontFamily:fontBold,
    fontSize:22,
    marginBottom:16,
    marginTop:16,
    alignSelf:'center'
    
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
    backgroundColor:'#000fff',
    overflow: 'hidden',
  },

   profileDetails:{
    marginLeft:16,
    fontFamily:fontBold,
    fontSize:16,
    marginBottom:16,
   },
   profileText:{
    marginLeft:16,
    fontFamily:fontRegular,
    fontSize:16,
    marginBottom:16,
   },
   profileTextRed:{
    marginLeft:16,
    fontFamily:fontRegular,
    fontSize:16,
    marginBottom:16,
    color:'#ff0000'
   },
   nameStyleTwo:{
    marginLeft:16,
    fontFamily:fontRegular,
    fontSize:16,
    marginBottom:16,
    marginTop:16,
    backgroundColor:packageBg,
    paddingStart:16,
    paddingEnd:16,
    padding:8,
    borderRadius:8,
    color:textColorWhite,
    textAlign:'center',
    overflow: 'hidden'
    
   }
});


