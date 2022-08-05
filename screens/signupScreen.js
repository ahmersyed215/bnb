import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity,Alert,ActivityIndicator,Image,TouchableWithoutFeedback,ScrollView} from 'react-native';
import Icons_FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icons_Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { firebase } from '../model/config'
import {AuthContext} from '../component/context';
import {global_style} from '../styles/global_styles'
import {Keyboard} from 'react-native'
import Header from '../component/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { colorGradientOne, colorGradientTwo, textColorBack, textColorWhite } from '../assets/colors/colors';
import { fontRegular, fontBold } from '../assets/font/fonts';
import { endPoint, registerExtension, title } from '../assets/strings/strings';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App({navigation}) {

  const [data, setData] = React.useState({
    firstName:'',
    lastName:'',
    firstNumber:'',
    secondNumber:'',
    dateOfBirth:'',
    address:'',
    email:'',
    password: '',
    confirm_password: '',
    
   
    secureTextEntry: true,
    secureConfirmTextEntry: true,
    
 
});


const {sign_in } = React.useContext(AuthContext)
const [loading, isLoading] = React.useState(false);




const updateSecureTextEntry = () => {
  setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
  });
}

const updateSecureConfirmTextEntry = () => {
  setData({
      ...data,
      secureConfirmTextEntry: !data.secureConfirmTextEntry
  });
}

var params

const callApi = () =>{
  axios.post(endPoint+registerExtension,params,{
    "headers": {
    "content-type": "application/json",
    },
    
    })
    .then(function(response) {
      isLoading(false)
  
    console.log(response.data);
    if(response.data.success=="true"){
      console.log("Success")
    }else{
      Alert.alert('Error occured', response.data.message, [{text: 'Okay'}]);
    }
    
    })
    
    .catch(function(error) {
    isLoading(false)
    console.log(error);
    
    });
    
    
}

const validate = (text) => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    console.log("Email is Not Correct");
    return false;
  }
  else {
    console.log("Email is Correct");
    return true;
  }
}


const validateNumber = (text) => {
  console.log(text);
  let reg = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
  if (reg.test(text) === false) {
    console.log("Number is Not Correct");
    return false;
  }
  else {
    console.log("Number is Correct");
    return true;
  }
}

const signup_handle = (data) => {

  console.log(data)

if(data.firstName=='' || data.firstName.length<3){
  Alert.alert('Wrong Input!', 'First Name cannot be Empty', [{text: 'Okay'}]);
}else if(data.lastName=='' || data.lastName.length<3){
  Alert.alert('Wrong Input!', 'Last Name cannot be Empty', [{text: 'Okay'}]);
}else if(!validate(data.email)){
  Alert.alert('Wrong Input!', 'Email Invalid', [{text: 'Okay'}]);
}else if(data.password.length<6 || data.confirm_password.length<6){
  Alert.alert('Wrong Input!', 'Password too Weak', [{text: 'Okay'}]);
}else if(data.password!=data.confirm_password){
  Alert.alert('Wrong Input!', 'Password Doesnt match', [{text: 'Okay'}]);
}else if(!validateNumber(data.firstNumber)){
  Alert.alert('Wrong Input!', 'First Number Invalid', [{text: 'Okay'}]);
}else if(!validateNumber(data.secondNumber)){
  Alert.alert('Wrong Input!', 'Second Number Invalid', [{text: 'Okay'}]);
}else if(data.address=='' || data.address.length<3){
  Alert.alert('Wrong Input!', 'Address cannot be Empty', [{text: 'Okay'}]);
}else if(data.dateOfBirth=='' || data.dateOfBirth.length<3){
  Alert.alert('Wrong Input!', 'Birthday cannot be Empty', [{text: 'Okay'}]);
}else{
    isLoading(true)
    console.log("Calling API")
    params = JSON.stringify({
    "FirstName": data.firstName,
    "LastName": data.firstName,
    "Email": data.email,
    "Address":data.firstName,
    "DOB": data.firstName,
    "Phone": data.firstName,
    "SecondaryPhone":data.firstName,
    "Username":data.firstName,
    "Password": data.firstName,
  
    });
    callApi()
}

 
}
/*
if(data.firstName){
  Alert.alert('First name Invalid', [{text: 'Okay'}]);
}else if(data.lastName.length<3){
  Alert.alert('Last name Invalid', [{text: 'Okay'}]);
}else{
  
}
*/
if(loading) {
  return (
       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
           <ActivityIndicator size="large" color="#0000ff"/>
       </View>
  )
 }
  return (
   
    <TouchableWithoutFeedback  accessible={false}>
    
    <SafeAreaView style={global_style.container}>
   
    <Header title={title} navigation={navigation}/>
    <LinearGradient
     colors={[colorGradientOne,colorGradientTwo]}
     start={{ x: 0, y: 1 }}
     end={{ x: 1, y: 1 }}
     style={{flex:1}}>  

     <ScrollView>
    
       <View style={styles.header}>
        <Image
         source={require('../assets/images/logonewshadow.png')}
          style={global_style.logoRegister}/>
        <View style={{alignItems:'center'}}>
        <Text style={styles.entry_text}>Register</Text>
        </View>
      </View>

    <View
    style={styles.footer}
    >
      

      <View style={styles.row}>
        
           <TextInput
            placeholder="First Name"
            placeholderTextColor={textColorWhite} 
            style={styles.input_text}
            onChangeText={(value) =>  setData({...data,firstName:value})}
            value={data.firstName}
           
           />
           
        </View>


        <View style={styles.row}>
        
           <TextInput
            placeholder="Last Name"
            style={styles.input_text}
            placeholderTextColor={textColorWhite} 
            onChangeText={(value) =>  setData({...data,lastName:value})}
            value={data.lastName}
         />
          
        </View>

        <View style={styles.row}>
        
        <TextInput
         placeholder="Date of Birth (YYYY/MM/DD)"
         style={styles.input_text}
         placeholderTextColor={textColorWhite} 
         autoCapitalize="none"
         value={data.dateOfBirth}
         onChangeText={(value) =>  setData({...data,dateOfBirth:value})}

      />
       
     </View>

     <View style={styles.row}>
        
        <TextInput
         placeholder="Phone Number One"
         style={styles.input_text}
         placeholderTextColor={textColorWhite} 
         autoCapitalize="none"
         value={data.firstNumber}
         onChangeText={(value) =>  setData({...data,firstNumber:value})}

      />
       
     </View>

     <View style={styles.row}>
        
        <TextInput
         placeholder="Phone Number Two"
         style={styles.input_text}
         placeholderTextColor={textColorWhite} 
         autoCapitalize="none"
         value={data.secondNumber}
         onChangeText={(value) =>  setData({...data,secondNumber:value})}
      />
       
     </View>

     <View style={styles.row}>
        
        <TextInput
         placeholder="Address"
         style={styles.input_text}
         placeholderTextColor={textColorWhite} 
         autoCapitalize="none"
         value={data.address}
         onChangeText={(value) =>  setData({...data,address:value})}
      />
       
     </View>

     <View style={styles.row}>
        
        <TextInput
         placeholder="Email"
         style={styles.input_text}
         placeholderTextColor={textColorWhite} 
         autoCapitalize="none"
         value={data.email}
         onChangeText={(value) =>  setData({...data,email:value})}

      />
       
     </View>


        <View style={styles.row}>
        
           <TextInput
            placeholder="Password"
            value={data.password}
            placeholderTextColor={textColorWhite} 
            style={styles.input_text}
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(value) =>  setData({...data,password:value})}
           />
             <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Icons_Feather 
                        name="eye-off"
                        color={textColorBack}
                        size={20}
                    />
                    :
                    <Icons_Feather 
                        name="eye"
                        color={textColorBack}
                        size={20}
                    />
                    }
                </TouchableOpacity>
        </View>

        <View style={styles.row}>
        
           <TextInput
            placeholder="Password Confirm"
            style={styles.input_text}
            value={data.confirm_password}
            placeholderTextColor={textColorWhite} 
            secureTextEntry={data.secureConfirmTextEntry ? true : false}
            onChangeText={(value) =>  setData({...data,confirm_password:value})}
            />
             <TouchableOpacity
                    onPress={updateSecureConfirmTextEntry}
                >
                    {data.secureConfirmTextEntry ? 
                    <Icons_Feather 
                        name="eye-off"
                        color={textColorBack}
                        size={20}
                    />
                    :
                    <Icons_Feather 
                        name="eye"
                        color={textColorBack}
                        size={20}
                    />
                    }
                </TouchableOpacity>
        </View>

          <View style={styles.button}>
            <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => {signup_handle(data)}}
                >
                  <Text style={styles.textSign}>Sign Up</Text>
            </TouchableOpacity>

         
          </View>     

      
      </View>
      </ScrollView>
      </LinearGradient>
    
    </SafeAreaView>
   
    </TouchableWithoutFeedback>
   
  );

}

const styles = StyleSheet.create({
 
  header: {
    justifyContent: 'space-around',
    
    marginTop:8,
    alignItems:'center'
  },
  row: {
    flexDirection: 'row',
    marginTop:24
  
  },
  input_text: {
    flex: 1,
    marginLeft:10,
    fontSize:18,
    fontFamily:fontRegular,
    color: textColorWhite,
    borderBottomWidth:1,
    borderColor:textColorBack,
    paddingVertical:4,
  
  },   
  textSign: {
    fontSize: 18,
    fontFamily:fontBold,
    color: textColorBack
},  
  footer: {
    paddingHorizontal: 50,
    paddingBottom:30
 
  },
  signIn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

    padding:8,
    
  
  
},
  entry_text:{
    color:textColorBack,
    fontFamily:fontBold,
    fontSize:24,
    marginTop:24
  
  },  
  button: {
   justifyContent:'center',
    marginTop: 24,
    backgroundColor:textColorWhite,
    borderRadius:8
},
});
