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

export default function PackagesDiscountListItem({item,pressHandler,navigation}){

    
    var colors = [ packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg, profileBg ];
    console.log(doctorImageUrlEndPoint+item.Picture%6)
    return(
        
           
            <View style={styles.container}>
            
        

            {item.stringValue        
            ?   
            <Text style={{fontWeight:'bold', width:'33%',textAlign:'center', fontFamily:fontRegular}}>
                {item.Service}
            </Text>
            : 
            <Text style={{width:'33%',fontFamily:fontRegular}}>
                {item.Service}
            </Text>      
            }
           

            {item.stringValue        
            ?   
            <Text style={{fontWeight:'bold',width:'30%',textAlign:'center',fontFamily:fontRegular}}>
            {item.Service_Price}
            </Text>
            : 
            <Text style={{width:'30%',textAlign:'center',fontFamily:fontRegular}}>
              {item.Service_Price}
            </Text>      
            }

            

            {item.stringValue        
            ?   
            <Text style={{fontWeight:'bold',width:'33%',fontFamily:fontRegular}}>
            {item.stringValue}
            </Text>
            : 
            <Text style= {{width:'33%',textAlign:'center',fontFamily:fontRegular}}>
            {item.Service_Price-item.DiscountedPrice}
            </Text>      
            }   
       
               

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
       marginBottom:16, 
       flexDirection:'row',
       justifyContent:'flex-start',
       borderBottomColor:'#eee',
       borderBottomWidth:1    
        
    },
    packageImageContainer:{
        height:100,
        width:100  ,
        alignSelf:'center',
        marginTop:16
      },
      packageLogoContainer:{
        height:50,
        width:50,
        alignSelf:'center',
        marginTop:16,
        marginLeft:8
      },
  
   

})
 