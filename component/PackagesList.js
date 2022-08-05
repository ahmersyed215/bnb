import React from 'react';
import {View,StyleSheet,Dimensions, Touchable,Image, TouchableWithoutFeedback,Text} from 'react-native';

import { fontRegular, fontBold } from '../assets/font/fonts';

import { global_style } from '../styles/global_styles';
import { textColorBack, textColorWhite} from '../assets/colors/colors';
import { packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg,profileBg,infoBg,patientCenteredQuestionsBg } from '../assets/colors/colors';
import { imageUrlEndPoint } from '../assets/strings/strings';
export default function PackagesList({item,pressHandler,navigation}){

    
    console.log(imageUrlEndPoint+item.ServiceID%6)
    return(
        <TouchableWithoutFeedback 
        onPress={()=> pressHandler(item)}
        >
           
            <View style={{alignItems:'center',marginTop:16}} >

                <Image
                    style={styles.packageImageContainer}
                    source={{uri:imageUrlEndPoint+item.Logo}} 
                />
                <Text style={styles.text_written}
                
                >{ item.Name}</Text> 
            </View>
            
           
        </TouchableWithoutFeedback>
     
    )

}

const styles = StyleSheet.create({

    text_written:{
       
        fontFamily: fontRegular,
        fontSize:20,
      
        color:textColorBack,
        textAlign:'center'

    },
    packageImageContainer:{

        width:100,
        height:100
    },
    container:{
      
        padding:10,
        height:150,
        borderRadius:16,
        margin:16,
    
        width: Dimensions.get('window').width/2.5,
        justifyContent:'center',
        alignItems:'center'
       
        
    },
  
   

})
 