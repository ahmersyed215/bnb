import React, { useState ,useEffect,useMemo} from 'react';
import Home from './screens/home_screen';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {AppNavigator,AuthNavigator,AppNavigatorTwo} from './routes/home_stack';

import Drawer from './routes/Drawer';
import DrawerTest from './routes/DrawerTest';
import { isLoading } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import {AuthContext} from './component/context'
import AsyncStorage from '@react-native-async-storage/async-storage';

import AnimateStackOnDrawerToggle from './drawer_customization/AnimateStackOnDrawerToggle';

const get_font = () => Font.loadAsync({
        'nunito-regular': require('./assets/font/Nunito/Nunito-Regular.ttf'),
        'nunito-bold': require('./assets/font/Nunito/Nunito-Bold.ttf'),
        'thankyou-regular': require('./assets/font/Nunito/Thank-you.ttf')
});

import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  //const [is_loading , set_loading] =  useState (true);
  //const [user_token,set_user_token] = useState(null);  




  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);

 
  const initial_login_state = {
    is_loading: true,
    user_name: null,
    user_token: null,
    user_theme:false
  };

  const login_reducer = (prev_state,action) =>{

    switch(action.type){

      case 'LOGIN':
        return {
          ...prev_state,
          user_token:action.user_token,
          user_name:action.user_name,
          is_loading:false
        };
      case 'SIGNUP':
        return {
          user_token:action.user_token,
          user_name:action.user_name,
          is_loading:false
        };
      case 'SIGNOUT':
        return {
          user_token: null,
          user_name: null,
          is_loading:false
        };

      case 'RETRIEVE_TOKEN':
        return {
          user_token:action.user_token,
          is_loading:false
        };
    }

  };


  const [login_state ,dispatch ] =React.useReducer(login_reducer,initial_login_state)
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;


  const auth_context = useMemo(()=>({
    sign_in: async (user_name,user_token)=> {
      //set_loading(false)
      //set_user_token("asas")
      const my_token = user_token;
      
      try {
        await AsyncStorage.setItem('user_token', my_token);
      } catch(e) {
        console.log(e);
      }
      console.log('calling dispatching'+my_token)
      dispatch({type: 'LOGIN' , user_name:user_name,user_token:my_token})
    },
    sign_up: async(user_token)=> {
      //set_loading(false)
      //set_user_token("asas")
      const my_token = user_token;
      console.log(my_token)
      try {
        await AsyncStorage.setItem('user_token', my_token);
      } catch(e) {
        console.log(e);
      }

      dispatch({type: 'SIGNUP' , user_name:user_name,user_token:my_token})

    },
    sign_out: async ()=> {
      //set_loading(true)
      //set_user_token(null)

      try {
        await AsyncStorage.removeItem('user_token');
      } catch(e) {
        console.log(e);
      }
      dispatch({type: 'SIGNOUT'})
    },
    toggleTheme: async () => {
      console.log('toggling'+isDarkTheme)
      setIsDarkTheme( isDarkTheme => !isDarkTheme );

      try {
        await AsyncStorage.setItem('current_theme', isDarkTheme+"");
      } catch(e) {
        console.log(e);
      }

    },

  }));

  useEffect(() => {
    setTimeout( async() => {
       
      try {
        user_token = await AsyncStorage.getItem('user_token');
      } catch(e) {
        console.log(e);
      }

      try {
        user_theme =await AsyncStorage.getItem('current_theme');
        console.log("current theme:"+user_theme)
      } catch(e) {
        console.log(e);
      }

      setIsDarkTheme(user_theme)
    
      console.log("init token"+user_token)
      
      dispatch({type: 'RETRIEVE_TOKEN' ,user_token:user_token})
      
    }, 1000);
  }, []);

 
    
  if(login_state.is_loading || fontsLoaded==false){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <AppLoading size="large"
        startAsync={get_font} 
        onError={console.warn}
        onFinish={() => setFontsLoaded(true)
        } 
        />
      </View>
    )
  }
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={auth_context}>
      { login_state.user_token !==null ?
      (
        <NavigationContainer theme={theme}>
           <Drawer/>
        </NavigationContainer>
      
      )
      :
      <NavigationContainer theme={theme}>
        <AuthNavigator/>
      </NavigationContainer>
      }
    
    </AuthContext.Provider>
    </PaperProvider>
    
    )
  
    
    }