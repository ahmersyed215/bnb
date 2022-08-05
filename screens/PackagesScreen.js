import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreens from '../component/HeaderScreens';
import axios from 'axios';
import { fontRegular, fontBold } from '../assets/font/fonts';
import PackagesList from '../component/PackagesList';
import { textColorWhite,packageBg } from '../assets/colors/colors';
import { endPoint,getPackagesExtension,copyrightsTextValue } from '../assets/strings/strings';


export default function App({navigation,route}) {
  const [loading, isLoading] = React.useState(false);


  //console.log(route.params.key.name)


  const [packagesValues,setPackagesValues]=useState([]);

  const callServicesApi = () =>{
    axios.get(endPoint+getPackagesExtension,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
    isLoading(false)
      console.log(response.data);
      setPackagesValues(response.data)

      console.log("Packages Array:"+packagesValues);
    
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
    navigation.goBack()
   }

   const pressHandlerItem = (key) => {
    console.log("im pressed"+key)
    navigation.navigate('PackagesDetailsScreen',{key})
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
    <Text style={styles.nameStyle}>Packages LIST</Text>

    <View stye={{flex:1}}>
    <FlatList
          data={packagesValues}
          numColumns={2}
          keyExtractor={(item, index) => String(item.ID) }
          contentContainerStyle={{ paddingBottom: 120 }}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
          renderItem={({ item }) => (
            <PackagesList item={item} pressHandler={pressHandlerItem} navigation={navigation} />
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


