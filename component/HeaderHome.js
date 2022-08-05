import React from 'react';
import {View,  StyleSheet, TextInput,SafeAreaView ,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {global_style} from '../styles/global_styles'
import { fontRegular, fontBold,fontHeader } from '../assets/font/fonts';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';

import { colorGradientOne, colorGradientTwo, textColorBack, textColorWhite } from '../assets/colors/colors';

const HeaderHome = ({title,pressHandler,navigation}) => {

  const { colors } = useTheme();


  return (
    <SafeAreaView >
    <View style={styles.header}>
      <Icon style={styles.icon}  name="ios-menu" size={35} color={textColorBack} onPress={()=> navigation.openDrawer()}></Icon>
     
      <Text style={styles.text}>{title}</Text>  
      
       <Image
         source={require('../assets/images/bblogo.png')}
          style={global_style.logoHeader}/>
    </View>
    </SafeAreaView>
  );

};

HeaderHome.defaultProps = {
  title: 'Bites & Braces',
};

const styles = StyleSheet.create({
  header: {
    
    height: 55,
    justifyContent:'space-between',
    backgroundColor: textColorWhite,
    flexDirection:'row',
    alignItems:'center',
  
  },
  
  icon: {
    margin:10,
  },
  header_details: {
    alignItems:'center',
    justifyContent:'center',
    flex:1
  },
  text: {
    color: textColorBack,
    fontSize: 24,
    fontFamily:fontHeader
   
    
  },
});


export default HeaderHome;