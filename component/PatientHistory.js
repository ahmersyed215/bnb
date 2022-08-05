import React from 'react';
import {View,StyleSheet,Dimensions, Touchable,Image, TouchableWithoutFeedback,Text} from 'react-native';

import { fontRegular, fontBold } from '../assets/font/fonts';

import { global_style } from '../styles/global_styles';
import { textColorBack, textColorWhite} from '../assets/colors/colors';
import { packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg,profileBg,infoBg,patientCenteredQuestionsBg } from '../assets/colors/colors';
import { serviceImageUrlEndPoint } from '../assets/strings/strings';
export default function PatientHistory({item,pressHandler,navigation}){

    
    var colors = [ packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg, profileBg ];
  
    return(
      <View style={styles.mainContainer}>
          <View style={styles.container}>
          <Text style={styles.textWrittenBold}>Date Visited: </Text>
          <Text style={styles.text_written}>{item.VisitDate}</Text>
          </View>
        

          <View style={styles.container}>
          <Text style={styles.textWrittenBold}>Service: </Text>
          <Text style={styles.text_written}>{item.Service}</Text>
          </View>

          <View style={styles.container}>
          <Text style={styles.textWrittenBold}>Remarks: </Text>
          <Text style={styles.text_written}>{item.Remarks}</Text>
          </View>

          <View style={styles.container}>
          <Text style={styles.textWrittenBold}>Doctor: </Text>
          <Text style={styles.text_written}>{item.Doctor}</Text>
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
        borderWidth:2,
        borderColor:textColorBack,
        marginTop:16,
        padding:8
    }
  
   

})
 