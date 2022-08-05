import React from 'react';
import {View,StyleSheet, Touchable,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

  
import {

    Text,
    TouchableRipple,
 
} from 'react-native-paper';


export default function sectionList({item,pressHandler,navigation}){

    return(
        <TouchableRipple 
        style={styles.box}
        onPress={()=> navigation.push("SectionDetails",item)}
        >
            
            <View style={styles.container}>

              
                <Text style={styles.text_written}
                
                >{ item.name}</Text> 
                <Icon  name="caret-forward-outline" size={25} color="#009387" ></Icon>

            </View>
            
           
        </TouchableRipple>
     
    )

}

const styles = StyleSheet.create({

    text_written:{
       
        marginLeft:10,
        fontFamily: 'nunito-bold',
        fontSize:20,
    },
    container:{
        padding:10,
        marginTop:8,
        borderRadius:8,
        borderColor:'#009387',
        borderWidth:1,
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'#ffffff',
        width:'100%',
        justifyContent:'space-between'
    },
    box:{
        marginTop:16,
    }
  
   

})
 