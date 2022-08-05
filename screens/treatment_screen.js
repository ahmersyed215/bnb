import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreens from '../component/HeaderScreens';
import axios from 'axios';
import { fontRegular, fontBold } from '../assets/font/fonts';
import ServicesScreenItems from '../component/ServicesItems';

import { endPoint,getServicesExtension, title } from '../assets/strings/strings';


export default function App({navigation,route}) {
  const [loading, isLoading] = React.useState(false);


  //console.log(route.params.key.name)


  const [servicesValue,setServicesValue]=useState([]);

  const callServicesApi = () =>{
    axios.get(endPoint+getServicesExtension,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
    isLoading(false)
      console.log(response.data);
      setServicesValue(response.data)

      console.log("Services Array:"+servicesValue);
    
      })
      
      .catch(function(error) {
      isLoading(false)
      console.log(error);
      
      });
      
      
  }

  
  
  useEffect(()  => {
    console.log("Calling services API")
   

    isLoading(true)
    callServicesApi()
  }, []);

  const pressHandlerBack = () => {
    console.log("im pressed")
    navigation.navigate("Home")
   }

   const pressHandlerItem = (key) => {
    console.log("im pressed"+key)
    navigation.navigate("TreatmentDetails",key)
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
    <Text style={styles.nameStyle}>TREATMENT LIST</Text>

    <View stye={{flex:1}}>
    <FlatList
          data={servicesValue}
          numColumns={3}
          keyExtractor={(item, index) => item.ServiceID }
          contentContainerStyle={{ paddingBottom: 120 }}
          //columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({ item }) => (
            <ServicesScreenItems item={item} pressHandler={pressHandlerItem} navigation={navigation} />
          )}
        />
  </View>
   
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
    marginBottom:16,
    marginTop:16,
    textAlign:'center',
    fontSize:24
    
   }
});


