import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator,Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../model/config';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreens from '../component/HeaderScreens';
import axios from 'axios';
import { fontRegular, fontBold,fontHeader } from '../assets/font/fonts';    
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


import { endPoint, registerExtension } from '../assets/strings/strings';
import { packageBg ,textColorBack,textColorWhite ,textColorHint} from '../assets/colors/colors';


export default function App({navigation,route}) {
  const [loading, isLoading] = React.useState(false);



  const [profileData, setProfileData] = React.useState({
    patientNumber:'',
    phoneNumber:'',
    secondNumber:'',
    dateOfBirth:'Date of Birth',
    address:'',
    firstName: '',
    lastName: '',
    password:null,
    patientId:'',
    parentId:'',
    email:null,
    relationshipID:''
    
});





  var params
const callApi = () =>{
  console.log(params)
  console.log(endPoint+registerExtension)
  axios.post(endPoint+registerExtension,params,{
    "headers": {
    "content-type": "application/json",
    },
    
    })
    .then(function(response) {
      isLoading(false)
  
    console.log(response.data);

    if(response.data.success){
      Alert.alert('Profile Added!', response.data.message, [{text: 'Okay'}]);
    }else{
      Alert.alert('Error occured', response.data.message, [{text: 'Okay'}]);
    }
   
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
        setProfileData({...profileData,parentId:user_token})
        params="?PatientNumber="+user_token
        getUserDetails()
      } catch(e) {
        user_token=""
      }
      console.log(user_token)
    }
 
    initialiseValues()
  
  }, []);

  const pressHandlerBack = () => {
    console.log("im pressed")
    navigation.goBack()
   }

   const [date, setDate] = useState(new Date(Date.now()));
   const [show, setShow] = useState(false);
   const [mode, setMode] = useState('date');
   const onChange = (event, selectedDate) => {
     var currentDate = selectedDate || date;
     setShow(Platform.OS === 'ios');
     setDate(currentDate);
     console.log(currentDate.getUTCMonth() + 1)
     console.log(currentDate.getUTCDate())
     console.log(currentDate.getUTCFullYear())  
     var dateSelcted=currentDate.getUTCFullYear()+"-"+(currentDate.getUTCMonth()+1)+"-"+currentDate.getUTCDate()
     setProfileData({...profileData,dateOfBirth:dateSelcted})
    
   };
   
   const showMode = (currentMode) => {
     setShow(true);
     setMode(currentMode);
   };
   
   const pickDate = () => {
    console.log("Showing date")
   setShow(true);
  }

  var options ={
    "1": "Spouse",
    "2": "Father",
    "3": "Mother",
    "4": "Son",
    "5": "Daughter",
    "6": "Uncle",
    "7": "Cousins",
    "8": "Others",
    "9": "Friend",
    "10": "Self"
};
  const addProfile = () => {
    console.log("Update profile")
    //console.log(profileData)
    //isLoading(true)

    params = JSON.stringify({
      "PatientNumber":null,
      "PackageID":null,
      "RequestedPackageID":0,
      "ParentID":profileData.parentId,
      "RelationshipID":profileData.relationshipID,

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
     

      console.log(params)
      isLoading(true)
      callApi() 
      
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



     <TouchableOpacity
         onPress={()=> pickDate()}>
     <View style={styles.row}> 
       
    
        <Text
         placeholder="Birthday"
         style={styles.input_text_birthday}
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
     
    
<View style={styles.rowPicker}>
  <Text style={{fontSize:18,fontFamily:fontRegular}}>Relationship: </Text>
  <Picker
    style={styles.internalPickerContainer}
    mode="dropdown"
    selectedValue={options[0]}
    onValueChange={(value)=>{
      setProfileData({...profileData,relationshipID:value})
    }}>
    {Object.keys(options).map((key) => {
        return (<Picker.Item label={options[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
    })}
    </Picker>
</View>
     
   

    <TouchableOpacity
     onPress={()=> addProfile()}>
    <Text style={styles.nameStyleTwo}>ADD ACCOUNT</Text>
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
  rowPicker: {
    flexDirection: 'row',
    marginTop:24,
    justifyContent:'center'
  
  },
  internalPickerContainer: {
    flex: Platform.OS === 'ios' ? 1 : null, // for Android, not visible otherwise.
    width: Platform.OS === 'ios' ? undefined : 180,
    fontFamily:fontRegular
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
  
    
  },input_text_birthday: {
    flex: 1,
    marginLeft:32,
    marginRight:32,
    fontSize:18,
    fontFamily:fontRegular,
    color: textColorHint,
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


