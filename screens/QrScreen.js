import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator,Linking ,Image} from 'react-native';
import HeaderScreens from '../component/HeaderScreens';
import axios from 'axios';
import { fontRegular, fontBold } from '../assets/font/fonts';
import { aboutUsHeader,aboutUsDetails ,copyrightsTextValue,imageUrlEndPoint,endPoint, 
  getPackagesExtension,getSocialMediaLinksExtension, title} from '../assets/strings/strings';
import { textColorWhite,packageBg, textColorBack } from '../assets/colors/colors';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { global_style } from '../styles/global_styles';

export default function App({navigation,route}) {
  const [loading, isLoading] = React.useState(false);
  const [token, setToken] = React.useState("id");


  const [links, setLinks] = React.useState([]);


  const callApiSocialMedia = () =>{
    axios.get(endPoint+getSocialMediaLinksExtension,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
        isLoading(false)
    
      console.log(response.data);
      setLinks(response.data)
      console.log(links)
      })
      
      .catch(function(error) {
      isLoading(false)
      console.log(error);
      
      });
      
      
  }



  useEffect(()  => {
    async function initialiseValues() {
        try {
            user_token = await AsyncStorage.getItem('user_token');
            setToken(user_token)
        } catch(e) {
          console.log(e)
          }
          console.log(user_token)
    }
    console.log("Calling API")
    //isLoading(true)
  
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

    <SafeAreaView style={global_style.container}>
    <View style={styles.container}>
    <HeaderScreens title={title}  pressHandler={pressHandlerBack}  navigation={navigation} />


 <View style={styles.qrOuterContainer}>
    <QRCode
      style={styles.qrContainer}
      value={token}
      size={200}
    />
   
   </View>

  
   <View style={styles.footer}><Text style={styles.textFooter}>{copyrightsTextValue}</Text></View>
    </View>
      
    </SafeAreaView>
   
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:8,
    backgroundColor:'#ffffff',

},
qrOuterContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height:'85%',
},

qrContainer:{
   alignSelf:'center',
  
},
footer:{
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


