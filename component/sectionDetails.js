import React from 'react';
import {View,StyleSheet, Touchable,Image,SafeAreaView, ScrollView,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
    Provider as PaperProvider, 
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme 
  } from 'react-native-paper';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
    Drawer,
    Text,
    TouchableRipple,
 
} from 'react-native-paper';
import { global_style } from '../styles/global_styles';

export default function sectionList({item,pressHandler,navigation}){

    return(
        <TouchableRipple style={styles.box}>
            
            <View style={styles.container}>
            <View style={styles.rowItem}>
               
                <Icon  name={item.iconName} size={35} color="#009387" ></Icon>
                <Text style={styles.text_written}>{item.name}</Text>            
                
            </View>


            <View style={styles.center_align}>
            <AnimatedCircularProgress
                size={100}
                width={5}
            
                fill={((item.value-item.lower_value)/(item.upper_value-item.lower_value))*100}
                tintColor="#009387"
                backgroundColor="#eee">
                {
                    (fill) => (
                        <Text style={styles.text_written}>{ item.value} {item.units}</Text> 
                    )
                }
                </AnimatedCircularProgress>
               
            </View>
            </View>
           
           
        </TouchableRipple>
     
    )

}

const styles = StyleSheet.create({

    text_written:{
       
        marginLeft:10,
        fontFamily: 'nunito-bold',
        fontSize:16,
    },
    container:{
        borderRadius:16
        ,
        borderColor:'#009387',
        borderWidth:4,
        alignItems:'center',
        padding:8
       
    },
    center_align:{
        justifyContent:'center',
        alignItems:'center'
    },
    box:{
        marginTop:16,
    
        width:'48%',  
            
    },
    rowItem:{
    flex:1,
    flexDirection:'row',
    padding:8,
    alignItems:'center',
   
    marginBottom:8
    },   
  
  
   

})
 