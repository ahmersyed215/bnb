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
export default function DoctorListItem({item,pressHandler,navigation}){

    
    var colors = [ packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg, profileBg ];
    console.log(doctorImageUrlEndPoint+item.Picture%6)
    return(
        
           
            <View style={styles.container}>
                
                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={styles.text_written}>
                        {item.Qualification}
                    </Text>
                 
                </View>

                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={styles.text_written_bold}>{ item.FirstName} { item.LastName}</Text> 
                    <Text style={styles.text_written}>{ item.ClinicName}</Text> 
                    <Image
                        style={styles.packageImageContainer}
                        source={{uri:doctorImageUrlEndPoint+item.Picture}} 
                    />
             
                </View>

               
                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <TouchableWithoutFeedback onPress={()=> pressHandler(item.FacebookProfile)}>
                    <Image 
                        source={require('../assets/images/fbicon.png')}
                        style={styles.packageLogoContainer} />
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=> pressHandler(item.InstagramProfile)}>
                    <Image 
                        source={require('../assets/images/instashadowicon.png')}
                        style={styles.packageLogoContainer} />
                    </TouchableWithoutFeedback> 
                </View>
                
            </View>
            
           
     
    )

}

const styles = StyleSheet.create({

    text_written:{
       
        fontFamily: fontRegular,
        fontSize:14,
        color:textColorBack,
        textAlign:'center'
      

    },
    text_written_bold:{
       
        fontFamily: fontBold,
        fontSize:16,
        color:textColorBack,
        textAlign:'center'

    },
    container:{
       marginBottom:64, 
       flexDirection: 'row',
       justifyContent:'space-evenly'
          
        
    },
    packageImageContainer:{
        height:100,
        width:100  ,
        alignSelf:'center',
        marginTop:16
      },
      packageLogoContainer:{
        height:50,
        width:50  ,
        alignSelf:'center',
        marginTop:16
      },
  
   

})
 