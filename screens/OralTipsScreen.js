import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator,Linking ,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreens from '../component/HeaderScreens';
import axios from 'axios';
import { fontRegular, fontBold } from '../assets/font/fonts';
import PackagesDiscountListItem from '../component/PackagesDiscountListItem';
import { global_style } from '../styles/global_styles';
import { endPoint,getPackageInfoExtension ,copyrightsTextValue,imageUrlEndPoint, getNotificationsExtensions} from '../assets/strings/strings';
import { textColorWhite,packageBg } from '../assets/colors/colors';
import OralHealthItem from '../component/OralHealthItem';


export default function App({navigation}) {
  const [loading, isLoading] = React.useState(false);


  const [oralTips,setOralTips]=useState([]);

  const callOralTipsApi = () =>{
    axios.get(endPoint+getNotificationsExtensions,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
      isLoading(false)
      console.log(response.data);
      setOralTips(response.data)
      })
      
      .catch(function(error) {
      isLoading(false)
      console.log(error);
      
      });
      
      
  }

  
  
  useEffect(()  => {
  
    isLoading(true)
    callOralTipsApi()
  }, []);

  const pressHandlerBack = () => {
    console.log("im pressed")
    navigation.goBack()
   }

   const pressHandlerItem = (key) => {
  
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
    
    <View style={{flexDirection:'row', marginTop:16,justifyContent:'center'}}>
     
        <Text  style={styles.descriptionText}>Oral Health</Text>
      
    </View>   


  

    <View style={{flex:1}}>
    
    <FlatList
          data={oralTips}

          keyExtractor={(item, index) => String(index) }
          contentContainerStyle={{ paddingBottom: 120 }}
       
          renderItem={({ item ,index}) => (
            <OralHealthItem item={item} pressHandler={pressHandlerItem} navigation={navigation} index={index} />
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
  packageRequestBox:{

    width:'80%',
    backgroundColor:packageBg,
    alignSelf:'center',
    padding:10,
    marginTop:16,
    marginBottom:16,
    borderRadius:8

  },
  packageText:{
        color:textColorWhite,
        fontFamily:fontBold,
        alignSelf:'center'
  },

  descriptionText:{
      fontFamily:fontBold,
      fontSize:24
  },
  tableTextBoldSmall:{
    fontFamily:fontBold,
    fontSize:16
},
  descriptionTextBold:{
    fontFamily:fontBold,
    fontSize:18,
    marginTop:16,
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


