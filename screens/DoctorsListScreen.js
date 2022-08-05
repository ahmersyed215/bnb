import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator,Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreens from '../component/HeaderScreens';
import axios from 'axios';
import { fontRegular, fontBold } from '../assets/font/fonts';
import DoctorScreen from '../component/DoctorListItem';

import { endPoint,getDoctorExtension ,copyrightsTextValue} from '../assets/strings/strings';
import { textColorWhite } from '../assets/colors/colors';


export default function App({navigation,route}) {
  const [loading, isLoading] = React.useState(false);


  //console.log(route.params.key.name)


  const [doctorValue,setDoctorValue]=useState([]);

  const callServicesApi = () =>{
    axios.get(endPoint+getDoctorExtension,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
    isLoading(false)
      console.log(response.data);
      setDoctorValue(response.data)

      console.log("Doctor Array:"+setDoctorValue);
    
      })
      
      .catch(function(error) {
      isLoading(false)
      console.log(error);
      
      });
      
      
  }

  
  
  useEffect(()  => {
    console.log("Calling Doctor API")
   

    isLoading(true)
    callServicesApi()
  }, []);

  const pressHandlerBack = () => {
    console.log("im pressed")
    navigation.goBack()
   }

   const pressHandlerItem = (key) => {
    //console.log("im pressed"+key)
    //navigation.navigate("TreatmentDetails",key)

    //loadInBrowser = () => {Linking.openURL(key).catch(err => console.error("Couldn't load page", err));};

    Linking.openURL(key);
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
   
   
    <HeaderScreens title="Bites & Braces"  pressHandler={pressHandlerBack}  navigation={navigation} />
    
    <View style={{flex:1}}>
    <FlatList
          data={doctorValue}
        
          keyExtractor={(item, index) => String(item.ID) }
          contentContainerStyle={{ paddingBottom: 120 }}
       
          renderItem={({ item }) => (
            <DoctorScreen item={item} pressHandler={pressHandlerItem} navigation={navigation} />
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
  copyrightText:{
    color:'#ffffff',
    fontFamily:fontRegular,
    fontSize:12
  },
  nameStyle:{
    marginLeft:16,
    fontFamily:fontBold,
    marginBottom:16,
    marginTop:16,
    textAlign:'center',
    fontSize:24
    
   }
});


