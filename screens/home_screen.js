import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator,Linking } from 'react-native';
import {global_style} from '../styles/global_styles'
import QrItem from '../component/qrList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../model/config';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderHome from '../component/HeaderHome';
import axios from 'axios';
import { fontRegular, fontBold,fontHeader } from '../assets/font/fonts';
import PackagesListHomeScreen from '../component/packagesListHomeScreen';
import HomeScreenItems from '../component/homeScreenItems';
import { endPoint, getPackagesExtension,getSocialMediaLinksExtension,getSubUsersExtension,getUserDetailsExtension, patientCenteredQuestionsUrl, title } from '../assets/strings/strings';
import { packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg,profileBg,infoBg,patientCenteredQuestionsBg } from '../assets/colors/colors';
import { cos } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';
import { AuthContext } from '../component/context';
import * as Notifications from 'expo-notifications';
import DropDownPicker from 'react-native-dropdown-picker';

export default function App({navigation}) {
  const [loading, isLoading] = React.useState(false);

  const [darazLink, setDarazLink] = React.useState(false);
  const [reviewLink, setReviewLink] = React.useState(false);

  const [name, setName] = React.useState("");

  const {sign_in } = React.useContext(AuthContext)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Test Value");


  const [recent_views, set_recent_views] = useState([

   
    { title: require('../assets/iconsHome/packages.png') , name:'Packages' , key:1,color:packagesBg},
  
    { title: require('../assets/iconsHome/sicon.png') , name:'Treatments' , key:2,color:treatmentBg},
  
    { title: require('../assets/iconsHome/productsonline.png'), name:'Online Products' , key:3,color:onlineProductBg},

    { title: require('../assets/iconsHome/ricon.png') , name:'Reviews' , key:4,color:reviewBg},

    { title: require('../assets/iconsHome/codeqr.png') , name:'QR Code' , key:5,color:qrBg},
    { title: require('../assets/iconsHome/iconaboutus.png') , name:'About us' , key:6,color:infoBg},
    { title: require('../assets/iconsHome/aicon.png') , name:'Profile' , key:7,color:profileBg},
    { title: require('../assets/iconsHome/ricon.png') , name:'Patient Questions' , key:8,color:patientCenteredQuestionsBg},
    { title: require('../assets/iconsHome/plus.png') , name:'Oral Health' , key:9,color:packagesBg},
    

  
  ]);
  const [packagesValues,setPackagesValues]=useState([]);

  const callPackagesApi = () =>{
    axios.get(endPoint+getPackagesExtension,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
        isLoading(false)
    
     //console.log(response.data);
      setPackagesValues(response.data)

      //console.log("Packages Array"+packagesValues);
      //console.log(recent_views);
      })
      
      .catch(function(error) {
      isLoading(false)
      console.log(error);
      
      });
      
      
  }

  const callApiSocialMedia = () =>{
    axios.get(endPoint+getSocialMediaLinksExtension,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
        isLoading(false)
    
      //console.log(response.data);
      setDarazLink(response.data[3].Link)

    
      setReviewLink(response.data[0].Link)
      console.log(reviewLink)
    
      })
      
      .catch(function(error) {
      isLoading(false)
      console.log(error);
      
      });
      
      
  }

  const getUserDetails = () =>{
    axios.get(endPoint+getUserDetailsExtension+params,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
        isLoading(false)

        getSubUsers(response.data[0].ParentID,response.data[0].PatientNumber)
    
      //console.log("Person:"+response.data[0].LastName);
      setName(response.data[0].FirstName+" ")
      //console.log(name);
    
      })
      
      .catch(function(error) {
      isLoading(false)
      console.log(error);
      
      });
      
      
  }
  const users =[]  
  var params,paramsParent
  const [subUsers,setSubUsers]=useState([]);

  const getSubUsers = (paramsParent,user_token) =>{
    axios.get(endPoint+getSubUsersExtension+"?ParentID="+paramsParent,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
        isLoading(false)
    
      
        console.log("Tada:"+user_token);
        
        var i
      
        for (i=0;i<response.data.length;i++){
          
          var newVal={label:response.data[i].FirstName,value:response.data[i].PatientNumber}
          //console.log(newVal)
           if(newVal.value==user_token){
             console.log(newVal.label)
             setValue(newVal.label)
             console.log(value,"Value")
           }
          users.push(newVal)
        }
        setSubUsers(users.slice())
      
     
    
    
    })
      .catch(function(error) {
      isLoading(false)
      console.log(error);
      
      });  
  }
  
  const changeId =(val)=> {
    console.log(val.value);
    sign_in(val.label,val.value+"");
  }


  useEffect(()  => {
    async function initialiseValues() {
      try {
        user_token = await AsyncStorage.getItem('user_token');
        //paramsParent="?ParentID="+user_token
        //console.log(paramsParent,"Parent")
        params="?PatientNumber="+user_token
        
        registerForPushNotificationsAsync()
      
        getUserDetails()
       
      } catch(e) {
        user_token=""
      }
      console.log(user_token)
    }
    console.log("Calling API")
    initialiseValues()
    isLoading(true)
    callPackagesApi()
    callApiSocialMedia()
   
  }, []);


   const registerForPushNotificationsAsync = async ()=> {
    let token;
    //if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    //} else {
    //  alert('Must use physical device for Push Notifications');
    //}
    
    if(token){
      firebase.database().ref('/users/' + user_token).set({
        "token":token,
      })
      .then(function(snapshot) {
        isLoading(false);
        sign_in(name,user_token)
      });
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  const pressHandlerPackages = (key) => {
    console.log("im pressed"+key.ID)
    navigation.navigate('PackagesDetailsScreen',{key})
   }

   const pressHandlerItems = (key) => {
    console.log("im pressed"+key.name)
    if(key.name=="Treatments"){
     
      navigation.navigate('TreatmentScreen',{key})
    }
    if(key.name=="Packages"){
      
      navigation.navigate('PackagesScreen',{key})
    }
    if(key.name=="Reviews"){
      
      Linking.openURL(reviewLink);
    }
    if(key.name=="Online Products"){
      
      Linking.openURL(darazLink);
    }
    if(key.name=="QR Code"){
      
      navigation.navigate('QrScreen')
    }
    if(key.name=="About us"){
      navigation.navigate('AboutUsScreen')
    }
    if(key.name=="Patient Centered Questions"){ 
      Linking.openURL(patientCenteredQuestionsUrl);
    }
    if(key.name == "Profile"){
      navigation.navigate('UserProfile',{key})
    }

    if(key.name == "Oral Health"){
      
      navigation.navigate('OralTips')
    }
   
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
  
   
    <HeaderHome title={title}  navigation={navigation}/>
    
    <View style={styles.rowPicker}>

    <DropDownPicker
      open={open}
      defaultValue="item1"
      value={value}
      items={subUsers}
      setOpen={setOpen}
      setValue={setValue}
      onSelectItem={(item) => {
        changeId(item)
      }}
      style={{ borderWidth:0 }}
      placeholder={value}
    
    />
    

</View>


    <View>
    <FlatList
          horizontal
          data={packagesValues}
          //numColumns={4}
          keyExtractor={(item, index) => index.toString() }
          showsHorizontalScrollIndicator={false}
          //columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({ item }) => (
            <PackagesListHomeScreen item={item} pressHandler={pressHandlerPackages} navigation={navigation} />
          )}
        />
  </View>
  <View stye={{flex:1,marginTop:100}}>
  <FlatList
          data={recent_views}
          numColumns={3}
          keyExtractor={(item, index) => index.toString() }
          contentContainerStyle={{ paddingBottom: 200 }}
          columnWrapperStyle={{justifyContent: 'space-around'}}
          renderItem={({ item }) => (
            <HomeScreenItems item={item} pressHandler={pressHandlerItems} navigation={navigation} />
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
    fontFamily:fontRegular,
    marginBottom:16,
    marginTop:16,
    
   },
     rowPicker: {
    flexDirection: 'row',
  
    ...Platform.select({
      ios: {
        zIndex: 10
      }
    })
  
  },
  internalPickerContainer: {
    flex: Platform.OS === 'ios' ? 1 : null, // for Android, not visible otherwise.
    width: Platform.OS === 'ios' ? undefined : 180,
    fontFamily:fontRegular
  },
});


