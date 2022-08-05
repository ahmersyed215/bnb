import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator,Linking ,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreens from '../component/HeaderScreens';
import axios from 'axios';
import { fontRegular, fontBold } from '../assets/font/fonts';
import PackagesDiscountListItem from '../component/PackagesDiscountListItem';
import { global_style } from '../styles/global_styles';
import { aboutUsHeader,aboutUsDetails ,copyrightsTextValue,imageUrlEndPoint,endPoint, getPackagesExtension,getSocialMediaLinksExtension} from '../assets/strings/strings';
import { textColorWhite,packageBg, textColorBack } from '../assets/colors/colors';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';


export default function App({navigation,route}) {
  const [loading, isLoading] = React.useState(false);


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
      
    }
    console.log("Calling API")
    isLoading(true)
  
    callApiSocialMedia()
  }, []);


  const pressHandlerBack = () => {
    console.log("im pressed")
    navigation.goBack()
   }

  
   const openEmail = () => {
    console.log("Open Email")
    Linking.openURL('mailto:'+links[6].Link) 
   }

   const openWebsite = () => {
    console.log("Open Website")
    Linking.openURL(links[7].Link);
   }

   const openFacebook = () => {
    console.log("Open FB")
    Linking.openURL(links[5].Link);
   }

   const openInstagram = () => {
    console.log("Open IG")
    Linking.openURL(links[2].Link);
   }

   const openYoutube = () => {
    console.log("Open YT")
    Linking.openURL(links[1].Link);
   }

   const openGPS = () => {
    console.log("Open GPS")
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
   
    <HeaderScreens title="Bites & Braces"  pressHandler={pressHandlerBack}  navigation={navigation} />
    <View style={{alignItems:'center'}}>
    <View style={{alignItems:'center',width:'80%'}}>
        <View >
        <Image 
                 source={require('../assets/images/bblogo.png')}
                 style={styles.packageLogoContainer} />
        </View>

        <View>
        <Text  style={styles.descriptionTextBold}>{aboutUsHeader}</Text>
        </View>

        <View>
        <Text  style={styles.descriptionText}>{aboutUsDetails}</Text>
        </View>
        
    </View>   

    </View>

    <TouchableWithoutFeedback
    onPress={()=> openEmail()}
    >
    <View style={{flexDirection:'row',borderColor:'#eee',borderWidth:2}}>
    <Image 
    source={require('../assets/images/email.png')}
    style={styles.itemLogoContainer} />
    <View style={{justifyContent:'center',marginLeft:16}}>
    <Text style={styles.itemText}>Email</Text>
    </View>
    </View>
    </TouchableWithoutFeedback>


    <TouchableWithoutFeedback
      onPress={()=> openWebsite()}
    >
    <View style={{flexDirection:'row',borderColor:'#eee',borderBottomWidth:2}}>
    <Image 
    source={require('../assets/images/linkicon.png')}
    style={styles.itemLogoContainerWeb} />
    <View style={{justifyContent:'center',marginLeft:16}}>
    <Text style={styles.itemText}>Website</Text>
    </View>
    </View>
    </TouchableWithoutFeedback>


    <TouchableWithoutFeedback
      onPress={()=> openFacebook()}
    >
    <View style={{flexDirection:'row',borderColor:'#eee',borderBottomWidth:2}}>
    <Image 
    source={require('../assets/images/fbicon.png')}
    style={styles.itemLogoContainer} />
    <View style={{justifyContent:'center',marginLeft:16}}>
    <Text style={styles.itemText}>Facebook</Text>
    </View>
    </View>
    </TouchableWithoutFeedback>

    <TouchableWithoutFeedback
      onPress={()=> openInstagram()}
    >
    <View style={{flexDirection:'row',borderColor:'#eee',borderBottomWidth:2}}>
    <Image 
    source={require('../assets/images/instaicon.png')}
    style={styles.itemLogoContainer} />
    <View style={{justifyContent:'center',marginLeft:16}}>
    <Text style={styles.itemText}>Instagram</Text>
    </View>
    </View>
    </TouchableWithoutFeedback>

    <TouchableWithoutFeedback
      onPress={()=> openYoutube()}
    >
    <View style={{flexDirection:'row',borderColor:'#eee',borderBottomWidth:2}}>
    <Image 
    source={require('../assets/images/youtube.png')}
    style={styles.itemLogoContainer} />
    <View style={{justifyContent:'center',marginLeft:16}}>
    <Text style={styles.itemText}>Youtube</Text>
    </View>
    </View> 
    </TouchableWithoutFeedback>

    <TouchableWithoutFeedback
      onPress={()=> openGPS()}
    >
    <View style={{flexDirection:'row',borderColor:'#eee',borderBottomWidth:2}}>
    <Image 
    source={require('../assets/images/googleplaystore.png')}
    style={styles.itemLogoContainer} />
    <View style={{justifyContent:'center',marginLeft:16}}>
    <Text style={styles.itemText}>Rate our App</Text>
    </View>
    </View> 
    </TouchableWithoutFeedback>

  
   
   </ScrollView>
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
  itemText:{
    fontFamily:fontRegular,
    color:textColorBack,
    fontSize:18
  },
  packageLogoContainer:{
  width:120,
  height:120
  },
  itemLogoContainer:{
    width:40,
    height:40
  },
  itemLogoContainerWeb:{
    width:30,
    height:30,
  },
  packageText:{
        color:textColorWhite,
        fontFamily:fontBold,
        alignSelf:'center'
  },

  descriptionText:{
      fontFamily:fontRegular,
      fontSize:16,
      alignItems:'center',
      marginTop:16,
      textAlign:'center',
  },
  tableTextBoldSmall:{
    fontFamily:fontBold,
    fontSize:16,
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


