import React, {useState,useEffect} from 'react';
import { StyleSheet,Text, View,Button, FlatList,StatusBar, Touchable,ActivityIndicator,Linking ,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderScreens from '../component/HeaderScreens';
import axios from 'axios';
import { fontRegular, fontBold } from '../assets/font/fonts';
import PackagesDiscountListItem from '../component/PackagesDiscountListItem';
import { global_style } from '../styles/global_styles';
import { endPoint,getPackageInfoExtension ,copyrightsTextValue,imageUrlEndPoint} from '../assets/strings/strings';
import { textColorWhite,packageBg } from '../assets/colors/colors';


export default function App({navigation,route}) {
  const [loading, isLoading] = React.useState(false);


  console.log(imageUrlEndPoint+route.params.key.Logo)


  const [packages,setPackages]=useState([]);

  const callPackagesApi = () =>{
    axios.get(endPoint+getPackageInfoExtension+route.params.key.ID,{
      "headers": {
      "content-type": "application/json",
      },
      
      })
      .then(function(response) {
    isLoading(false)
      console.log(response.data);
      let item = {Service:"Treatment", Service_Price:"Cost", stringValue:"Discounted Cost"}
      packages.push(item)

      setPackages(packages.concat(response.data))


      console.log("Pckages List:"+packages);
    
      })
      
      .catch(function(error) {
      isLoading(false)
      console.log(error);
      
      });
      
      
  }

  
  
  useEffect(()  => {
    console.log("Calling Packages API")
   

    isLoading(true)
    callPackagesApi()
  }, []);

  const pressHandlerBack = () => {
    console.log("im pressed")
    navigation.goBack()
   }

   const pressHandlerItem = (key) => {
  
   }
 
  if(loading) {
    return (
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <ActivityIndicator size="large" color="#0000ff"/>
         </View>
    )
   }

  return (
    <SafeAreaView style={styles.container}>
   
   
    <HeaderScreens title="Bites & Braces"  pressHandler={pressHandlerBack}  navigation={navigation} />
    
    <View style={{flexDirection:'row', marginTop:16,}}>
        <View >
            <Image
                style={global_style.serviceDetailsImageContainer}
                source={{uri:imageUrlEndPoint+route.params.key.Logo}} 
            />
        </View>
        <View  style={{justifyContent:'flex-start',padding:8}}>
        <Text  style={styles.descriptionText}>{route.params.key.Name}</Text>
        <Text  style={styles.descriptionText}>Price Rs: {route.params.key.Price}</Text>
        </View>
    </View>   

    <View style={styles.packageRequestBox}>
        <Text style={styles.packageText}>REQUEST A PACKAGE</Text>
    </View>

    <View>
        <Text  style={styles.descriptionText}>{route.params.key.Details}</Text>
    </View>

    <View>
        <Text  style={styles.descriptionTextBold    }>Discounts Included</Text>
    </View>

  

    <View style={{flex:1}}>
    
    <FlatList
          data={packages}
        
          keyExtractor={(item, index) => String(item.ServiceID) }
          contentContainerStyle={{ paddingBottom: 120 }}
       
          renderItem={({ item }) => (
            <PackagesDiscountListItem item={item} pressHandler={pressHandlerItem} navigation={navigation} />
          )}
        />
  </View>

  <View style={styles.footer}><Text style={styles.textFooter}>{copyrightsTextValue}</Text></View>
   
    </SafeAreaView>
   
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:8,
    backgroundColor:'#ffffff'
  },
  packageRequestBox:{

    width:'80%',
    backgroundColor:packageBg,
    alignSelf:'center',
    padding:10,
    marginTop:16,
    marginBottom:16,
    borderRadius:8

  },
  packageText:{
        color:textColorWhite,
        fontFamily:fontBold,
        alignSelf:'center'
  },

  descriptionText:{
      fontFamily:fontRegular,
      fontSize:16
  },
  tableTextBoldSmall:{
    fontFamily:fontBold,
    fontSize:16
},
  descriptionTextBold:{
    fontFamily:fontBold,
    fontSize:18,
    marginTop:16,
},
  footer:{
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor:'#000000'
  },
  textFooter:{
    alignSelf:'center',
    color:textColorWhite,
    fontFamily:fontRegular
  },
  copyrightText:{
    color:'#ffffff',
    fontFamily:fontRegular,
    fontSize:12
  },
  nameStyle:{
    marginLeft:16,
    fontFamily:fontBold,
    marginBottom:16,
    marginTop:16,
    textAlign:'center',
    fontSize:24
    
   }
});


