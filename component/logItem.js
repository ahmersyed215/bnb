import React from 'react';
import {View,StyleSheet, Touchable,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
    Provider as PaperProvider, 
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme 
  } from 'react-native-paper';

  
import {
    Drawer,
    Text,
    TouchableRipple,
 
} from 'react-native-paper';
import { global_style } from '../styles/global_styles';

export default function logItem({item}){

    return(
       <View style={styles.container}>

            <View style={styles.headerRow}>
                <View style={styles.rowEntityHeader}>
                    <Icon  name="calendar" size={35} color="#ffffff" ></Icon>
                    <Text style={styles.textOne}>{item.date}</Text>
                </View>
                
                <View style={styles.rowEntityHeader}>
                    <Icon  name="clock-outline" size={35} color="#ffffff" ></Icon>
                    <Text style={styles.textOne}>{item.time}</Text>
                </View>

            </View>

            <View style={styles.centerView}>
            <Text style={styles.seperationLine}> </Text>
            </View>
            
            <View style={styles.rowItem}>
                <View style={styles.rowEntity}>
                    <Icon  name="white-balance-sunny" size={35} color="#ffffff" ></Icon>
                    <Text style={styles.textOne}>{item.lightValue} Lumens</Text>
                </View>
                
                <View style={styles.rowEntity}>
                    <Icon  name="chemical-weapon" size={35} color="#ffffff" ></Icon>
                    <Text style={styles.textOne}>{item.phValue}</Text>
                </View>

            </View>

            <View style={styles.rowItem}>
                <View style={styles.rowEntity}>
                    <Icon  name="coolant-temperature" size={35} color="#ffffff" ></Icon>
                    <Text style={styles.textOne}>{item.temperatureValue} °C</Text>
                </View>
                
                <View style={styles.rowEntity}>
                    <Icon  name="lightning-bolt" size={35} color="#ffffff" ></Icon>
                    <Text style={styles.textOne}>{item.ecValue} V</Text>
                </View>

            </View>

       </View>
     
    )

}

const styles = StyleSheet.create({

    text_written:{
       
        marginLeft:10,
        fontFamily: 'nunito-bold',
        fontSize:20,
    },
    container:{
        borderRadius:8,
        backgroundColor:'#009387',
        margin:16,
        paddingBottom:16
    },
   
    textTwo:{
        fontFamily: 'nunito-bold',
        fontSize:18,
        color:'#ffffff',
        marginBottom:16
       
    }, 
    textOne:{
        fontFamily: 'nunito-regular',
        marginLeft:10,
        fontSize:20,
        color:'#ffffff'
       
    }, 
    rowItem:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
      
    },   
    headerRow:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:16
      
    },   
    centerView:{
        justifyContent:'center',
        alignItems:'center'
    },
    seperationLine:{
        borderBottomWidth:2,
        borderBottomColor:'#eee',
        width:'60%',
    
    },
    rowEntity:{
        flexDirection:'row',
        width:'45%',
        margin:4,
        alignItems:'center'
    },   
    rowEntityHeader:{
        flexDirection:'row',
        width:'45%',
        alignItems:'center'
    },   
   

})
 