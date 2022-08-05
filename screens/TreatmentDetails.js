import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreens from '../component/HeaderScreens';
import axios from 'axios';
import { fontRegular, fontBold } from '../assets/font/fonts';
import ServicesScreenItems from '../component/ServicesItems';
import { packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg,profileBg,infoBg,patientCenteredQuestionsBg } from '../assets/colors/colors';
import { serviceImageUrlEndPoint, title } from '../assets/strings/strings';
import { endPoint,getServicesExtension } from '../assets/strings/strings';
import { global_style } from '../styles/global_styles';

export default function App({navigation,route}) {
  const [loading, isLoading] = React.useState(false);

  var colors = [ packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg, profileBg ];


  console.log(serviceImageUrlEndPoint+route.params.Service_Logo)


  const [servicesValue,setServicesValue]=useState([]);

  
 

  const pressHandlerBack = () => {
    console.log("im pressed")
    navigation.navigate("TreatmentScreen")
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
    <HeaderScreens title={title}  pressHandler={pressHandlerBack}  navigation={navigation} />

    <View style={{flexDirection:'row', marginTop:16,}}>
        <View style={{backgroundColor:colors[route.params.ServiceID%6],borderRadius:16}}>
            <Image
                style={global_style.serviceDetailsImageContainer}
                source={{uri:serviceImageUrlEndPoint+route.params.Service_Logo}} 
            />
        </View>
        <View style={{justifyContent:'flex-start'}}>
        <Text style={styles.serviceName}>{route.params.Service_Name}</Text>
        <Text style={styles.serviceCost}>Price Rs: {route.params.Service_Price}</Text>
        </View>
    </View>   
   
   
    <Text style={styles.serviceDescription}>{route.params.Service_Details}</Text>
   
  

   
    </SafeAreaView>
   
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingLeft:8,
    backgroundColor:'#ffffff'
  },
  serviceName:{
    marginLeft:8,
    fontFamily:fontBold,
    marginBottom:8,
    marginTop:16,
    textAlign:'left',
    fontSize:24
    
   },
   serviceCost:{
    marginLeft:16,
    fontFamily:fontRegular,
    marginBottom:16,
   
    textAlign:'left',
    fontSize:18
    
   },
   serviceDescription:{
    fontFamily:fontRegular,
    marginTop:16,
    textAlign:'left',
    fontSize:18
    
   }
});


