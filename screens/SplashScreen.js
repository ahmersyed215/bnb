import React, {useState,useEffect} from 'react';
import { StyleSheet,Image, Text} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function App({navigation}) {
    const [loading, isLoading] = React.useState(false);
  
    setTimeout(() => {
    console.log("time out")
    navigation.navigate('Home')
  }, 4000);

    return (
      <SafeAreaView style={styles.container}>
    
      <Image 
        style={{width: 400, height: 300,alignSelf:'center'}}
      source={require('../assets/images/splashgif.gif')} />
    
      </SafeAreaView>
     
    );
  }
  const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:8,
      backgroundColor:'#ffffff',
      justifyContent:'center'
    },

  });
  
  
  