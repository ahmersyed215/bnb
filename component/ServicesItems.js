import React from 'react';
import {View,StyleSheet,Dimensions, Touchable,Image, TouchableWithoutFeedback,Text} from 'react-native';

import { fontRegular, fontBold } from '../assets/font/fonts';

import { global_style } from '../styles/global_styles';
import { textColorBack, textColorWhite} from '../assets/colors/colors';
import { packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg,profileBg,infoBg,patientCenteredQuestionsBg } from '../assets/colors/colors';
import { serviceImageUrlEndPoint } from '../assets/strings/strings';
export default function ServicesScreenItems({item,pressHandler,navigation}){

    
    var colors = [ packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg, profileBg ];
    console.log(serviceImageUrlEndPoint+item.ServiceID%6)
    return(
        <TouchableWithoutFeedback 
        onPress={()=> pressHandler(item)}
        >
           
            <View style={[styles.container,{backgroundColor:colors[item.ServiceID%6]}]}>

              
              <View style={{ margin:16,flex:1,  justifyContent:'center',alignItems:'center'}}>
              <Image
                    style={global_style.packageListContainer}
                    source={{uri:serviceImageUrlEndPoint+item.Service_Logo}} 
                />
                <Text style={styles.text_written}
               
                >{ item.Service_Name}</Text>  
              </View>
               
            </View>
            
           
        </TouchableWithoutFeedback>
     
    )

}

const styles = StyleSheet.create({

    text_written:{
        
        fontFamily: fontRegular,
        fontSize:16,
        color:textColorWhite,
        textAlign:'center',
        alignItems:'center'

    },
    container:{
        height:120,
        borderRadius:16,
        margin:8,
        width: Dimensions.get('window').width/3.5,
        justifyContent:'center',
       
        
        
    },
  
   

})
 