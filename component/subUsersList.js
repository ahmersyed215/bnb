import React from 'react';
import {View,StyleSheet,Dimensions, Touchable,Image, TouchableWithoutFeedback,Text} from 'react-native';

import { fontRegular, fontBold } from '../assets/font/fonts';

import { global_style } from '../styles/global_styles';
import { textColorBack, textColorWhite} from '../assets/colors/colors';
import { packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg,profileBg,infoBg,patientCenteredQuestionsBg } from '../assets/colors/colors';
import { serviceImageUrlEndPoint } from '../assets/strings/strings';
export default function subUsersList({item,pressHandler,navigation}){

    
    var colors = [ packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg, profileBg ];
  
    return(
      <View style={styles.mainContainer}>
          <View style={styles.container}>
          <Text style={styles.text_written}>{item.FirstName} </Text>
          <Text style={styles.text_written}>{item.LastName} : </Text>
          <Text style={styles.text_written}>{item.Relationship}</Text>
          </View>
        

       


      </View>
     
    )

}

const styles = StyleSheet.create({

    text_written:{ 
        fontFamily: fontRegular,
        fontSize:18,
        color:textColorBack,

    },textWrittenBold:{ 
        fontFamily: fontBold,
        fontSize:18,
        color:textColorBack,

    },
    container:{
    flexDirection:'row',
    },
    mainContainer:{ 
      
        marginTop:16,
        padding:8
    }
  
   

})
 