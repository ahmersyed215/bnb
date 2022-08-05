import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator,Linking, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreens from '../component/HeaderScreens';
import axios from 'axios';
import { fontRegular, fontBold,fontHeader } from '../assets/font/fonts';
import PatientHistory from '../component/PatientHistory';


import { endPoint, getPackagesExtension,getSocialMediaLinksExtension,getPatientHistoryExtention, copyrightsTextValue, title } from '../assets/strings/strings';
import { packageBg ,textColorWhite } from '../assets/colors/colors';


export default function App({navigation,route}) {
  const [loading, isLoading] = React.useState(false);

  const [darazLink, setDarazLink] = React.useState(false);
  const [reviewLink, setReviewLink] = React.useState(false);

  console.log("route val2:"+route.params.profileData)

  const [name, setName] = React.useState("");

  
const [patientHistory,setPatientHistory]=useState([]);

  const getPatientHistory = () =>{
    axios.get(endPoint+getPatientHistoryExtention+"?PatientNumber="+user_token,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
        isLoading(false)
    
        setPatientHistory(response.data)
        console.log("Packages Array:"+patientHistory);
   

      if(response.data.length<1){
        Alert.alert('User has no History!', response.data.message, [{text: 'Okay'}]);
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
        params="?PatientNumber="+user_token
        getPatientHistory()
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
 
   
    <HeaderScreens title={title}   pressHandler={pressHandlerBack}  navigation={navigation}/>

    <Text style={{alignSelf:'center',fontFamily:fontRegular,fontSize:18}}>Patient history</Text>
    <View stye={{flex:1}}>
    <FlatList
          data={patientHistory}
          keyExtractor={(item, index) => String(index) }
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <PatientHistory item={item} navigation={navigation} />
          )}
        />
  </View>
   
  <View style={styles.footer}><Text style={styles.textFooter}>{copyrightsTextValue}</Text></View>
 
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
    fontSize:22,
    marginBottom:16,
    marginTop:16,
    backgroundColor:packageBg,
    padding:16,
    borderRadius:8,
    color:textColorWhite
    
   }, nameStyle:{
    marginLeft:16,
    fontFamily:fontBold,
    marginBottom:16,
    marginTop:16,
    textAlign:'center',
    fontSize:24
    
   },footer:{
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor:'#000000'
  },
  textFooter:{
    alignSelf:'center',
    color:textColorWhite,
    fontFamily:fontRegular
  },
});

