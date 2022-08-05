import React from 'react';
import {View,StyleSheet,Dimensions, Touchable,Image, TouchableWithoutFeedback,} from 'react-native';
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
    TouchableWithoutFeedbackBase
 
} from 'react-native-paper';
import { global_style } from '../styles/global_styles';
import { textColorWhite} from '../assets/colors/colors';
export default function homeScreenItems({item,pressHandler,navigation}){


    

    return(
        <TouchableWithoutFeedback 
        onPress={()=> pressHandler(item)}
        >
            
            <View style={[styles.container,{ backgroundColor: item.color}]}>

                <Image
                    style={global_style.packageImageContainer}
                    source={item.title}
                />
                <Text style={styles.text_written}
                
                >{ item.name}</Text> 
            </View>
            
           
        </TouchableWithoutFeedback>
     
    )

}

const styles = StyleSheet.create({

    text_written:{
       
        fontFamily: 'nunito-regular',
        fontSize:16,
        color:textColorWhite,
        textAlign:'center'

    },
    container:{
      
        padding:10,
        height:130,
        borderRadius:16,
        margin:16,
        width: Dimensions.get('window').width/3.3,
        justifyContent:'center',
        alignItems:'center'
       
        
    },
  
   

})
 