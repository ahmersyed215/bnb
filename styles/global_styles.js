import { StyleSheet,Dimensions } from 'react-native';


const {height,width} = Dimensions.get("screen");
const height_logo = height * 0.28;
const heightLogoLogin = height * 0.18;
const widthLogoLogin = width * 0.8;

export const global_style = StyleSheet.create({
  container: {
    flex: 1,
    
   
  },
  title_text:{
    fontFamily: 'nunito-bold',
    fontSize:18,
   
  },
  paragraph_text:{
    marginVertical:8,
    lineHeight:20
  },  
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius:height_logo
},

logoLogin: {
  width: widthLogoLogin,
  height: heightLogoLogin,

},
logoHeader: {
  width: 48,
  height: 48,
  marginRight:16

},
logoRegister: {
  width: widthLogoLogin,
  height: heightLogoLogin,

},
logo_header: {
  width: height_logo/2,
  height: height_logo/2,
  borderRadius:height_logo/2,
  justifyContent:'center',
  alignSelf:'center'
},
logo_headerRegister: {
  marginTop:16,
  width: height_logo/2,
  height: height_logo/2,
  borderRadius:height_logo/2,
  justifyContent:'center',
  alignSelf:'center'
},

settings_header: {
  width: height_logo,
  height: height_logo,
  borderRadius:height_logo,
  justifyContent:'center',
  alignSelf:'center'
},
packageImageContainer:{
  height:70,
  width:70  
},
typeImageContainer:{
  height:100,
  width:100  
},
packageListContainer:{
  height:50,
  width:90,

},

serviceDetailsImageContainer:{
  height:100,
  width:100,
  borderRadius:12
 
},

});
