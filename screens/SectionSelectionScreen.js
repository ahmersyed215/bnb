import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import {global_style} from '../styles/global_styles'
import { StyleSheet, Text, View,FlatList,Image ,ActivityIndicator} from 'react-native';
import SectionItem from '../component/sectionList';
import { firebase } from '../model/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../component/Header';
import Icon from 'react-native-vector-icons/Ionicons';

export default function App({route,navigation}) {
  const { key,name,url } = route.params;

  const [sectionValues,setSectionValue]=useState([]);
  const [loading, isLoading] = React.useState(false);
  console.log("Section Selection:"+ key)

  useEffect(()  => {
  
    console.log("Starting")
    async function initialiseValues() {
      isLoading(true)
      firebase
      .database()
      .ref('Hardware/'+key)
      .once('value')
      .then(snapshot => {
      var main=[]
     //console.log(" data:"+snapshot.key())
      snapshot.forEach((child) => {
        console.log("section data: here"+child.val().name) 
        console.log("section key: here"+child.key) 
        if(child.val().name!=null){
          console.log('Is a section')
          main.push({
            "name":child.val().name,
            "key":child.key,  
            "productId":key
          })
        }else{
          console.log('not a section')
        }
  
      
     });
      setSectionValue(main)
      console.log(main)
      isLoading(false)
      });
    }
    initialiseValues()

  }, []);


  if(loading) {
    return (
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <ActivityIndicator size="large" color="#0000ff"/>
         </View>
    )
   }

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle= "default"/>

    <Header title="SELECT SECTION"  navigation={navigation}/>

      <View style={styles.section_header}>
      <Image style={global_style.qr_image_container} source={{uri:url}} />
      <View style={{justifyContent:'center',marginLeft:8}}>

      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Icon  name="md-card-outline" size={25} color="#009387" ></Icon>
        <Text style={styles.text}>{name}</Text>
      </View>

      <View style={{flexDirection:'row',alignItems:'center',marginTop:8}}>
        <Icon  name="ios-grid-outline" size={25} color="#009387" ></Icon>
        <Text style={styles.text}>Total Sections: {sectionValues.length}</Text>
      </View>
     
      </View>
     
      </View>
      
      <View style={styles.headerList}>
      <View style={styles.list}>
        <FlatList
                  data={sectionValues}
                  keyExtractor={(sectionValues, index) => index.toString()}
                  renderItem={({ item }) => (
                    <SectionItem item={item} navigation={navigation} />
                  )}
                 
                />
    </View>
    </View>
    </SafeAreaView>
    
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text:{
    fontFamily: 'nunito-bold',
    fontSize:16,
   
    marginLeft:8
    
  },
  section_header:{
    flexDirection:'row',
    marginTop:16,
    
  },
  list:{
    width:'80%',
  },
  headerList:{
    marginTop:16,
    alignItems:'center'
  }
});
