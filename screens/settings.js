import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { AuthContext } from '../component/context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {global_style} from '../styles/global_styles'
import { firebase } from '../model/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const {sign_out , toggleTheme} = React.useContext(AuthContext);

  const [info, setInfo] = React.useState({
    name: '',
    email: '',
    devices: ''
  
});

  const [loading, isLoading] = React.useState(false);
  
  useEffect(()  => {
    async function initialiseValues() {
    isLoading(true);
    console.log("Starting")
   
      try {
        user_token = await AsyncStorage.getItem('user_token');
      } catch(e) {
        console.log(e);
      }
      console.log(user_token)
     
      
      firebase
      .database()
      .ref('users/'+user_token+"/Hardware")
      .once('value')
      .then(users => {
        console.log("Size:"+users.numChildren())
        setInfo({
          ...info,
         devices:users.numChildren()
      });
    
      });


      firebase
      .database()
      .ref('users/'+user_token)
      .once('value')
      .then(users => {
        setInfo({
          ...info,
         name:users.val().name,
         email:users.val().email
      });

      
      isLoading(false)
      });

    }

    initialiseValues()
  

  }, []);




  const callSignOut = ()=>{
      sign_out()
  }
  return (
    <View style={styles.container}>
       <Image
          source={require('../assets/hydroponics.png')}
          style={global_style.settings_header}/>

    <View style={{flexDirection:'row',alignItems:'center',marginTop:8}}>
        <Icon  name="settings-outline" size={45} color="#009387" ></Icon>
        <Text style={styles.textWritten}>Settings</Text>
    </View>

    <View style={{borderBottomWidth:2,borderBottomColor:'#eee',marginTop:8}}>
    </View>

    <View style={styles.rowStyle}>
        <Icon  name="person" size={30} color="#009387" ></Icon>
        <Text style={styles.textParagraph}>{info.name}</Text>
    </View>

    <View style={styles.rowStyle}>
        <Icon  name="mail" size={30} color="#009387" ></Icon>
        <Text style={styles.textParagraph}>{info.email}</Text>
    </View>

    <View style={styles.rowStyle}>
        <Icon  name="ios-layers" size={30} color="#009387" ></Icon>
        <Text style={styles.textParagraph}>Total Devices: {info.devices}</Text>
    </View>

    <TouchableOpacity
      onPress={callSignOut}
      >
    <View style={{flexDirection:'row',alignItems:'center',marginTop:8,justifyContent:'space-between',paddingRight:16}}>
        <Text style={styles.textParagraph}>Logout</Text>
        <Icon  name="arrow-forward-sharp" size={30} color="#009387" ></Icon>
    </View>
    
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:8
  },
  textWritten:{
    fontFamily: 'nunito-regular',
    fontSize:32,
    marginLeft:8
  },
  textParagraph:{
    fontFamily: 'nunito-regular',
    fontSize:18,
    marginLeft:8
  },
  rowStyle:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:16
  }
});
