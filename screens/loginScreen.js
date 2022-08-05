import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TextInput, View,TouchableOpacity ,Image,ActivityIndicator,TouchableWithoutFeedback,Alert} from 'react-native';
import Icons_FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icons_Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {Keyboard} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { endPoint, loginExtension } from '../assets/strings/strings';

import axios from 'axios';
import {
  useTheme,
  Text,
} from 'react-native-paper';

import {AuthContext} from '../component/context';
import {global_style} from '../styles/global_styles'

import { colorGradientOne, colorGradientTwo, textColorBack, textColorWhite } from '../assets/colors/colors';
import { fontRegular, fontBold } from '../assets/font/fonts';

export default function App({navigation}) {

const {sign_in } = React.useContext(AuthContext)
const [loading, isLoading] = React.useState(false);



  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
});

const textInputChange = (val) => {
  if( val.trim().length >= 4 ) {
      setData({
          ...data,
          username: val,
          check_textInputChange: true,
          isValidUser: true
      });
  } else {
      setData({
          ...data,
          username: val,
          check_textInputChange: false,
          isValidUser: false
      });
  }
}




const handlePasswordChange = (val) => {
  if( val.trim().length >= 8 ) {
      setData({
          ...data,
          password: val,
          isValidPassword: true
      });
  } else {
      setData({
          ...data,
          password: val,
          isValidPassword: false
      });
  }
}

const updateSecureTextEntry = () => {
  setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
  });
}

const handleValidUser = (val) => {
  if( val.trim().length >= 4 ) {
      setData({
          ...data,
          isValidUser: true
      });
  } else {
      setData({
          ...data,
          isValidUser: false
      });
  }
}

const { colors } = useTheme();


var params

const logUserin = () =>{
  axios.post(endPoint+loginExtension+params,{
    "headers": {
    "content-type": "application/json",
    },
    
    })
    .then(function(response) {
    isLoading(false)
  
    console.log(response.data);
    if(response.data.success=="true"){
      console.log("Success")
      sign_in(data.userName,response.data.userId);
    }else{
      Alert.alert('Error occured', "Username or Password Incorrect", [{text: 'Okay'}]);
    }
    
    })
    
    .catch(function(error) {
    isLoading(false)
    console.log(error);
    Alert.alert('Error occured', "Username or Password Incorrect", [{text: 'Okay'}]);
    
    });
    
    
}


const loginHandle = (userName, password) => {

  console.log("hadnleing button click"+userName+" "+password)

  if(userName!=null && password!=null && userName!="" && password!=""){
      params="?userName="+userName+"&password="+password
      isLoading(true)
      logUserin()
      console.log(params)
  }else{
      console.log("null aps")
  }
  //
}


if(loading) {
  return (
       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
           <ActivityIndicator size="large" color="#0000ff"/>
       </View>
  )
 }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    
   
    <View style={global_style.container}>
    <LinearGradient
     colors={[colorGradientOne,colorGradientTwo]}
     start={{ x: 0, y: 1 }}
     end={{ x: 1, y: 1 }}
     style={{flex:1}}>  
    <View style={styles.header}>
    <Image
        source={require('../assets/images/logonewshadow.png')}
        style={global_style.logoLogin}
        
        />
    </View>
    
    <View style={styles.footer}>
    <Text style={styles.textSign}>Login</Text>
      <View style={styles.row}> 
        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.text}
          style={[styles.input_text,{color:colors.text ,fontFamily:'nunito-regular'}]}
          autoCapitalize="none"
          onChangeText={(val) => textInputChange(val)}
          onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}/>  
      </View>
      <View style={styles.row}> 
      
      <View style={[styles.input_text,{color:colors.text,flexDirection:'row',justifyContent:'space-between'}]}>
      <TextInput
            placeholder="Password"
            placeholderTextColor={colors.text}
            style={{flex:1,fontFamily:'nunito-regular'}}
            onChangeText={(val) => handlePasswordChange(val)}
            secureTextEntry={data.secureTextEntry ? true : false}/>
        <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Icons_Feather 
                        name="eye-off"
                        color={colors.text}
                        size={20}
                    />
                    :
                    <Icons_Feather 
                        name="eye"
                        color={colors.text}
                        size={20}
                    />
                    }
                </TouchableOpacity>
      </View>
      </View>

    <TouchableOpacity
       style={styles.button}
       onPress={() => {loginHandle( data.username, data.password )}}>
       <Text style={{fontFamily:'nunito-bold'}}>Login Now</Text>  
    
    </TouchableOpacity>
    <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity style={{flex:1}}> 
      <Text style={styles.loginText}>Forget Password</Text>
    </TouchableOpacity>
    <TouchableOpacity
     onPress={() => { navigation.navigate('Signup')}}
    >
      <Text style={styles.loginText}>Sign up Now!</Text>
    </TouchableOpacity>
    </View>

   

    </View>
    <View style={{justifyContent:'flex-end',backgroundColor:'#000000',height:20}}>
    <View style={{paddingLeft:52,paddingRight:32,justifyContent:'center'}}>
    <Text style={styles.copyrightText}>Copyright 2021 Bites & Braces - All rights Reserved</Text>
    </View>
    </View>
    
       
    </LinearGradient>
    </View>
    
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({

  copyrightText:{
    color:textColorWhite,
    fontFamily:fontRegular,
    fontSize:12
  },
  loginText:{
  color:textColorWhite,
  fontFamily:fontRegular
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    marginLeft:8,
    alignItems:'center'
  },
  row: {
    flexDirection: 'row',
    marginTop:20
  
  },
  input_text: {
    flex: 1,
  
    borderColor:textColorBack,
    borderWidth:1,
    padding:8,
    borderBottomLeftRadius:16,
    borderTopRightRadius:16,
    borderBottomRightRadius:16
  
  },   
  textSign: {
    fontSize: 32,
    fontFamily:fontBold,
   
},  
  footer: {
    flex: 5,
    alignItems:'center',
    paddingHorizontal: 50,
    paddingVertical: 30,
  
  },

  entry_text:{
    color:textColorWhite,
    fontFamily:fontBold,
    fontSize:24,
    marginTop:16
  },  
  button: {
    alignItems: 'center',
    marginTop: 32,
    borderWidth:1,
    borderRadius:16,
    width:'100%',
    padding:8,
  
},
});
