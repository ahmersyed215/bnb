import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator,Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../model/config';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreens from '../component/HeaderScreens';
import axios from 'axios';
import { fontRegular, fontBold,fontHeader } from '../assets/font/fonts';
import PackagesListHomeScreen from '../component/packagesListHomeScreen';
import HomeScreenItems from '../component/homeScreenItems';

import DateTimePicker from '@react-native-community/datetimepicker';


import { endPoint, getPackagesExtension,getSocialMediaLinksExtension,getUserDetailsExtension, updatePatientProfile } from '../assets/strings/strings';
import { packageBg ,textColorBack,textColorWhite ,textColorHint} from '../assets/colors/colors';


export default function App({navigation,route}) {
  const [loading, isLoading] = React.useState(false);

  const [darazLink, setDarazLink] = React.useState(false);
  const [reviewLink, setReviewLink] = React.useState(false);

  const [name, setName] = React.useState("");

  console.log("route val:"+route.params.res)

  const [profileData, setProfileData] = React.useState({
    patientNumber:'',
    phoneNumber:'',
    secondNumber:'',
    dateOfBirth:'',
    address:'',
    firstName: '',
    lastName: '',
    password:'',
    patientId:'',
    parentId:'',
    email:''
    
});


const [date, setDate] = useState(new Date(Date.now()));
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);


const onChange = (event, selectedDate) => {
  var currentDate = selectedDate || date;
  setShow(Platform.OS === 'ios');
  setDate(currentDate);
  console.log(currentDate.getUTCMonth() + 1)
  console.log(currentDate.getUTCDate())
  console.log(currentDate.getUTCFullYear())  
  var dateSelcted=currentDate.getUTCFullYear()+"-"+(currentDate.getUTCMonth()+1)+"-"+currentDate.getUTCDate()
  setShow(false)
  setProfileData({...profileData,dateOfBirth:dateSelcted})
 
};

const showMode = (currentMode) => {
  setShow(true);
  setMode(currentMode);
};

const showDatepicker = () => {
  showMode('date');
};

const showTimepicker = () => {
  showMode('time');
};


  const getUserDetails = () =>{
    axios.get(endPoint+getUserDetailsExtension+params,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
        isLoading(false)
      console.log(response.data[0]);

      setProfileData({
        ...profileData,
        patientNumber:response.data[0].PatientNumber,
        phoneNumber:response.data[0].Phone,
        secondNumber:response.data[0].SecondaryPhone ,
        dateOfBirth:(response.data[0].DOB).split('T',1)[0],
        address:response.data[0].Address ,
        firstName:response.data[0].FirstName ,
        parentId:response.data[0].ParentID ,
        lastName:response.data[0].LastName,
        password:response.data[0].Password,
        patientId:response.data[0].PatientNumber,
        email:response.data[0].Email,
    })
        console.log(profileData)
      })
      
      .catch(function(error) {
      isLoading(false)
      console.log(error);
      
      });
      
      
  }


  var params
const callApi = () =>{
  console.log(params)
  console.log(endPoint+updatePatientProfile)
  axios.post(endPoint+updatePatientProfile,params,{
    "headers": {
    "content-type": "application/json",
    },
    
    })
    .then(function(response) {
      isLoading(false)
  
    console.log(response.data.success);

    if(response.data.success){
      Alert.alert('Profile Updated!', response.data.message, [{text: 'Okay'}]);
    }else{
      Alert.alert('Error occured', response.data.message, [{text: 'Okay'}]);
    }
   
    })
    
    .catch(function(error) {
    isLoading(false)
    console.log(error);
    
    });
    
    
}
  const updateProfile = () => {
    console.log("Update profile")
    //console.log(profileData)
    isLoading(true)

    params = JSON.stringify({
      "PatientNumber":profileData.patientId,
      "PackageID":0,
      "RequestedPackageID":0,
      "ParentID":profileData.parentId,
      "RelationshipID":0,

      "FirstName": profileData.firstName,
      "LastName": profileData.lastName,
      "Email": profileData.email,
      "Address":profileData.address,
      "DOB": profileData.dateOfBirth,
      "Phone": profileData.phoneNumber,
      "SecondaryPhone":profileData.secondNumber,
      "Username":profileData.email,
      "Password": profileData.password,
      });
     
      callApi() 
   }
   const pickDate = () => {
     console.log("Showing date")
    setShow(true);
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

  const pressHandlerBack = () => {
    console.log("im pressed")
    navigation.goBack()
   }


  if(loading) {
    return (
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <ActivityIndicator size="large" color="#0000ff"/>
         </View>
    )
   }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
   
    <HeaderScreens title="Bites & Braces"  pressHandler={pressHandlerBack}   navigation={navigation}/>
    <Text style={{justifyContent:'center',fontSize:22,alignItems:'center',alignSelf:'center',margin:16,fontFamily:fontRegular}}>Edit profile Details</Text>


    <View style={styles.row}> 
        <TextInput
         placeholder="First Name"
         style={styles.input_text}
         placeholderTextColor={textColorHint} 
         autoCapitalize="none"
         value={profileData.firstName}
         onChangeText={(value) =>  setProfileData({...profileData,firstName:value})}
      />
       
     </View>

     <View style={styles.row}> 
        <TextInput
         placeholder="Last Name"
         style={styles.input_text}
         placeholderTextColor={textColorHint} 
         autoCapitalize="none"
         value={profileData.lastName}
         onChangeText={(value) =>  setProfileData({...profileData,lastName:value})}
      />
       
     </View>

     <View style={styles.row}> 
        <TextInput
         placeholder="Phone Number One"
         style={styles.input_text}
         placeholderTextColor={textColorHint} 
         autoCapitalize="none"
         value={profileData.phoneNumber}
         onChangeText={(value) =>  setProfileData({...profileData,phoneNumber:value})}
      />
       
     </View>

     <View style={styles.row}> 
        <TextInput
         placeholder="Phone Number Two"
         style={styles.input_text}
         placeholderTextColor={textColorHint} 
         autoCapitalize="none"
         value={profileData.secondNumber}
         onChangeText={(value) =>  setProfileData({...profileData,secondNumber:value})}
      />
       
     </View>

     <TouchableOpacity
         onPress={()=> pickDate()}>
     <View style={styles.row}> 
       
    
        <Text
         placeholder="Birthday"
         style={styles.input_text}
         placeholderTextColor={textColorHint} 
         autoCapitalize="none"
         editable={false}
         onTouchStart={()=> pickDate()}
         value={profileData.dateOfBirth}
         onChangeText={(value) =>  setProfileData({...profileData,dateOfBirth:value})}
      > {profileData.dateOfBirth}  </Text>
      
     </View>
     </TouchableOpacity>
     {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

     <View style={styles.row}> 
        <TextInput
         placeholder="Address"
         style={styles.input_text}
         placeholderTextColor={textColorHint} 
         autoCapitalize="none"
         value={profileData.address}
         onChangeText={(value) =>  setProfileData({...profileData,address:value})}
      />
       
     </View>
    

    <TouchableOpacity
     onPress={()=> updateProfile()}>
    <Text style={styles.nameStyleTwo}>SAVE CHANGES</Text>
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

  row: {
    flexDirection: 'row',
    marginTop:24
  
  },
  input_text: {
    flex: 1,
    marginLeft:32,
    marginRight:32,
    fontSize:18,
    fontFamily:fontRegular,
    color: textColorBack,
    borderBottomWidth:1,
    borderColor:textColorBack,
    paddingVertical:4,
    textAlign:'center',
  
  },   
  nameStyle:{
    marginLeft:16,
    fontFamily:fontBold,
    fontSize:22,
    marginBottom:16,
    marginTop:16,
    alignSelf:'center'
    
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
    marginLeft:32,
    marginRight:32,
    fontFamily:fontRegular,
    fontSize:18,
    marginBottom:16,
    marginTop:32,
    backgroundColor:packageBg,
    padding:8,
    borderRadius:8,
    color:textColorWhite,
    textAlign:'center'
    
   }
});


