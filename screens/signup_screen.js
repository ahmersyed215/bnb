import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View,TouchableOpacity,Alert,ActivityIndicator ,Image,TouchableWithoutFeedback} from 'react-native';
import Icons_FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icons_Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { firebase } from '../model/config'
import {AuthContext} from '../component/context';
import {global_style} from '../styles/global_styles'
import {Keyboard} from 'react-native'

export default function App({navigation}) {

  const [data, setData] = React.useState({
    username: 'ahmersyed215@gmail.com',
    password: '123456789',
    name:'ahmer',
    confirm_password: '123456789',
    check_textInputChange: false,
    secureTextEntry: true,
    secureConfirmTextEntry: true,
    isValidUser: false,
    isValidName:false,
    isValidPassword: false,
    isValidConfirmPassword: false,
});


const {sign_in } = React.useContext(AuthContext)
const [loading, isLoading] = React.useState(false);

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

const nameUpdate = (val) => {
  if( val.trim().length >= 4 ) {
      setData({
          ...data,
          name: val,
          isValidName: true
      });
  } else {
      setData({
          ...data,
          username: val,
          isValidName: false
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

const handleConfirmPasswordChange = (val) => {
  if( val.trim().length >= 8 ) {
      setData({
          ...data,
          confirm_password: val,
          isValidConfirmPassword: true
      });
  } else {
      setData({
          ...data,
          confirm_password: val,
          isValidConfirmPassword: false
      });
  }
}

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

const signup_handle = (userName, password , confirm_password,name) => {


  if ( userName.length == 0 || password.length == 0 || confirm_password.length==0 ) {
      Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
          {text: 'Okay'}
      ]);
      return;
  }else{
            isLoading(true);
            firebase
            .auth()
            .createUserWithEmailAndPassword(userName,password)
            .then((response) => {
             
                const uid = response.user.uid
                const data = {
                    id: uid,
                    userName,
                    name,
                    password
                  
                };
                console.log(data)
                firebase
                .database()
                .ref('/users/' + uid)
                .set({
                  id:uid,
                  "name":name,
                  "email":userName,
                  "password":password,
                  created_at: Date.now()
                })
                .then(function(snapshot) {
                  isLoading(false);
                  sign_in(name,uid)
                });
                
            })
            .catch((error) => {
                alert(error)
                isLoading(false);
        });


  return;
  }

  //signIn(foundUser);
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
    <View style={styles.container}>
       <StatusBar style="auto" />
       <View style={styles.header}>
        <Image
          source={require('../assets/hydroponics.png')}
          style={global_style.logo_header}/>
        <Text style={styles.entry_text}>Welcome to Our Signup Page</Text>
      </View>

      <View style={styles.footer}>

      <View style={styles.row}>
          <Icons_FontAwesome 
                      name="user-o"
                      color={'#000000'}
                      size={20}
                  />
           <TextInput
            placeholder="Name"
            style={styles.input_text}
            value={data.name}
            autoCapitalize="none"
            onChangeText={(val) => nameUpdate(val)}
          

         />
            {data.isValidName ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Icons_Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
        </View>


        <View style={styles.row}>
          <Icons_FontAwesome 
                      name="user-o"
                      color={'#000000'}
                      size={20}
                  />
           <TextInput
            placeholder="Email"
            style={styles.input_text}
            autoCapitalize="none"
            value={data.username}
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}

         />
            {data.isValidUser ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Icons_Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
        </View>


        <View style={styles.row}>
          <Icons_FontAwesome 
                      name="lock"
                      color={'#000000'}
                      size={20}
                  />
           <TextInput
            placeholder="Password"
            value={data.password}
            style={styles.input_text}
            onChangeText={(val) => handlePasswordChange(val)}
            secureTextEntry={data.secureTextEntry ? true : false}
           />
             <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Icons_Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Icons_Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Icons_FontAwesome 
                      name="lock"
                      color={'#000000'}
                      size={20}
                  />
           <TextInput
            placeholder="Password Confirm!"
            style={styles.input_text}
            value={data.confirm_password}
            onChangeText={(val) => handleConfirmPasswordChange(val)}
            secureTextEntry={data.secureConfirmTextEntry ? true : false}
           />
             <TouchableOpacity
                    onPress={updateSecureConfirmTextEntry}
                >
                    {data.secureConfirmTextEntry ? 
                    <Icons_Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Icons_Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
        </View>

          <View style={styles.button}>
            <TouchableOpacity
                  style={styles.signIn}
                  onPress={() => {signup_handle( data.username, data.password , data.confirm_password ,data.name)}}
                >
                  <Text style={styles.textSign}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                 onPress={() => { navigation.navigate('Login')}}
                >
                <Text style={{color: '#009387', marginTop:15}}>Already Have an Account? Sign IN!</Text>
          </TouchableOpacity>
          </View>     

      </View>
    </View>
    </TouchableWithoutFeedback>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 2,
    justifyContent: 'space-around',
    marginLeft:8,
    marginTop:8
  },
  row: {
    flexDirection: 'row',
    marginTop:20
  
  },
  input_text: {
    flex: 1,
    marginLeft:10,
    color: '#05375a', 
  
  },   
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009387'
},  
  footer: {
    flex: 5,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#009387',
    borderWidth: 1,
    marginTop: 15
},
  entry_text:{
    color:'white',
    fontFamily:'nunito-bold',
    fontSize:24
  },  
  button: {
    alignItems: 'center',
    marginTop: 50
},
});
