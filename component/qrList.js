import React from 'react';
import {View,StyleSheet, Touchable,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

export default function qrList({item,pressHandler,navigation}){

    return(
        <TouchableRipple 
        onPress={()=> navigation.push("SectionSelection",item)}
        >
            
            <View style={styles.container}>

                <Image
                    style={global_style.qr_image_container}
                    source={{uri:item.url}}
                />
                <Text style={styles.text_written}
                
                >{ item.name}</Text> 
            </View>
            
           
        </TouchableRipple>
     
    )

}

const styles = StyleSheet.create({

    text_written:{
       
        marginLeft:10,
        fontFamily: 'nunito-bold',
        fontSize:20,
    },
    container:{
        padding:10,
        borderRadius:8,
        borderColor:'#009387',
        borderWidth:4,
        alignItems:'center',
        backgroundColor:'#ffffff'
    },
  
   

})
 