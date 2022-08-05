import React from 'react';
import {View,StyleSheet,Dimensions, Touchable,Image, TouchableWithoutFeedback,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { 
    Provider as PaperProvider, 
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme 
  } from 'react-native-paper';

import { fontRegular, fontBold } from '../assets/font/fonts';
import {
    Drawer,
    Text,
    TouchableRipple,
    TouchableWithoutFeedbackBase
 
} from 'react-native-paper';
import { global_style } from '../styles/global_styles';
import { textColorBack, textColorWhite} from '../assets/colors/colors';
import { packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg,profileBg,infoBg,patientCenteredQuestionsBg } from '../assets/colors/colors';
import { doctorImageUrlEndPoint } from '../assets/strings/strings';

export default function ClinicItemDetails({item,pressHandler,navigation}){

    
    var colors = [ packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg, profileBg ];
    console.log(doctorImageUrlEndPoint+item.Picture%6)
    return(
        
           
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={()=> pressHandler(item.InstagramProfile)}>
                <Image 
                 source={require('../assets/images/bblogo.png')}
                 style={styles.packageImageContainer} />
                </TouchableWithoutFeedback> 

                <Text style={styles.text_written_bold}>
                    {item.ClinicName}
                </Text>
                <Text style={styles.text_written}>
                    {item.ClinicAddress}
                </Text>
                <Text style={styles.text_written}>
                    {item.OpeningTimings}
                </Text>
                <Text style={styles.text_written}>
                    {item.ClinicDays}
                </Text>
                <View style={{flexDirection:'row'}}>

                <TouchableWithoutFeedback onPress={()=> pressHandler(item.ClinicContact,null)}>
                <Image 
                     source={require('../assets/images/phone.png')}
                 style={styles.packageLogoContainer} />
                </TouchableWithoutFeedback> 

                <TouchableWithoutFeedback onPress={()=> pressHandler(item.ClinicContact,"whatsap")}>
                <Image 
                 source={require('../assets/images/whatsapp.png')}
                 style={styles.packageLogoContainer} />
                </TouchableWithoutFeedback> 
                

                <TouchableWithoutFeedback onPress={()=> pressHandler(item.GoogleMapURL,null)}>
                <Image 
                 source={require('../assets/images/maps.png')}
                 style={styles.packageLogoContainer} />
                </TouchableWithoutFeedback> 

                </View>

            </View>
            
           
     
    )

}

const styles = StyleSheet.create({

    text_written:{
       
        fontFamily: fontRegular,
        fontSize:18,
        color:textColorBack,
      

    },
    text_written_bold:{
       
        fontFamily: fontBold,
        fontSize:18,
        color:textColorBack,
        textAlign:'center'

    },
    container:{
      
       padding:0,
       marginBottom:32, 
       justifyContent:'center',
       alignItems:'center'
    
          
        
    },
    packageImageContainer:{
        height:100,
        width:100  ,
        alignSelf:'center',
        marginTop:16
      },
      packageLogoContainer:{
        height:48,
        width:48,
        alignSelf:'center',
        marginTop:16,
        marginLeft:8
      },
  
   

})
 