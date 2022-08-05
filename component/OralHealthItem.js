import React from 'react';
import {View,StyleSheet,Dimensions, Touchable,Image, TouchableWithoutFeedback,Text} from 'react-native';

import { fontRegular, fontBold } from '../assets/font/fonts';

import { global_style } from '../styles/global_styles';
import { textColorBack, textColorWhite} from '../assets/colors/colors';
import { packagesBg, treatmentBg, reviewBg, onlineProductBg,qrBg,profileBg,infoBg,patientCenteredQuestionsBg } from '../assets/colors/colors';
import { imageUrlEndPoint } from '../assets/strings/strings';
export default function OralHealthItem({item,pressHandler,index}){

    const dateTime = item.MessageSentDate
    
    var indexTwo = dateTime.indexOf("T");  // Gets the first index where a space occours
    var date = dateTime.substr(0, indexTwo); // Gets the first part
    var time = dateTime.substr(indexTwo + 1);
    var colors = [ treatmentBg, reviewBg, onlineProductBg,qrBg, profileBg ];
    

    return(
        <TouchableWithoutFeedback 
        onPress={()=> pressHandler(item)}
        >
           <View style={{padding:16,backgroundColor:colors[index%5],margin:16,borderRadius:16}}>

            <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between'}} >
                <Text style={styles.text_written}>Date : { date}</Text> 
                <Text style={styles.text_written}>Time : { time}</Text> 
            </View>
            
            <Text style={styles.text_written_two}>Message : { item.Message}</Text> 
            </View>
           
        </TouchableWithoutFeedback>
     
    )

}

const styles = StyleSheet.create({

    text_written:{
        fontFamily: fontBold,
        fontSize:12,
      
        color:textColorWhite,
        textAlign:'center'
    },
    
    text_written_two:{
        fontFamily: fontRegular,
        fontSize:16,
        marginTop:16,
        color:textColorWhite,
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
 