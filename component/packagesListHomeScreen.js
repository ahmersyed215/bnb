import React from 'react';
import {View,StyleSheet, Touchable,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { imageUrlEndPoint } from '../assets/strings/strings';
import { fontRegular, fontBold } from '../assets/font/fonts';
import { 
    Provider as PaperProvider, 
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme 
  } from 'react-native-paper';

  
import {
    Drawer,
    Text,
    TouchableRipple,
 
} from 'react-native-paper';
import { global_style } from '../styles/global_styles';

export default function packagesListHomtaeScreen({item,pressHandler,navigation}){
  
    
    return(
        <TouchableRipple 
        onPress={()=> pressHandler(item)}
        >
            
            <View style={styles.container}>

                <Image
                    style={global_style.typeImageContainer}
                    source={{uri:imageUrlEndPoint+item.Logo}}             />
                <Text style={styles.text_written}
                
                >{item.Name}</Text> 
            </View>
            
           
        </TouchableRipple>
     
    )

}

const styles = StyleSheet.create({

    text_written:{
        marginLeft:10,
    
        fontFamily:fontBold,
        fontSize:12,
        color:'#000000'
    },
    container:{
        height:150,
        padding:10,
        borderRadius:8, 
        alignItems:'center',
        backgroundColor:'#FFFFFF',
      
        padding:16
    },
  
   

})
 