import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,FlatList,Image,ActivityIndicator } from 'react-native';
import LogItem from '../component/logItem';
import { firebase } from '../model/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../component/Header';


export default function App({route,navigation}) {
  const { key,productId } = route.params;

  const [loading, isLoading] = React.useState(false);
  const [sectionValues,setSectionValue]=useState([]);

  const getDate = (value) => {
      console.log(value)

      var t = new Date(value);
      var hours = t.getHours();
      var minutes = t.getMinutes();
      var newformat = t.getHours() >= 12 ? 'PM' : 'AM';  
      
      // Find current hour in AM-PM Format 
      hours = hours % 12;  
      
      // To display "0" as "12" 
      hours = hours ? hours : 12;  
      minutes = minutes < 10 ? '0' + minutes : minutes; 
      var date = 
         ('0' + t.getDate()).slice(-2) 
          + '/' + ('0' + (t.getMonth() + 1) ).slice(-2)
          + '/' + (t.getFullYear())

      return date;
  }

  const getTime = (value) => {
    console.log(value)

    var t = new Date(value);
    var hours = t.getHours();
    var minutes = t.getMinutes();
    var newformat = t.getHours() >= 12 ? 'PM' : 'AM';  
    
    // Find current hour in AM-PM Format 
    hours = hours % 12;  
    
    // To display "0" as "12" 
    hours = hours ? hours : 12;  
    minutes = minutes < 10 ? '0' + minutes : minutes; 
    var time = 
     ('0' + t.getHours()).slice(-2)
        + ':' + ('0' + t.getMinutes()).slice(-2)
        + ' ' + newformat;

    return time;
}

  useEffect(()  => {
  
    console.log("Starting")
    async function initialiseValues() {
      isLoading(true)
      firebase
      .database()
      .ref('Hardware/'+productId+"/"+key+"/logs/")
      .once('value')
      .then(snapshot => {
      var main=[]
     //console.log(" data:"+snapshot.key())
      snapshot.forEach((child) => {
        console.log("logs data: here"+child.val()) 
        console.log("logs key: here"+child.key) 
          main.push({
            "date":getDate(child.val().tmpStamp),
            "time":getTime(child.val().tmpStamp),  
            "phValue":child.val().ph_value,
            "temperatureValue":child.val().temperature_value,
            "ecValue":child.val().ec_value,
            "lightValue":child.val().light_value,

          })
      
     });
      setSectionValue(main)
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

    <Header title="View Logs"  navigation={navigation}/>

        <FlatList
                  data={sectionValues}
                  keyExtractor={(sectionValues, index) => index.toString()}
                  renderItem={({ item }) => (
                    <LogItem item={item}  />
                  )}
                 
                />
  
    
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
    marginTop:16,
    marginLeft:8
    
  },
  section_header:{
    flexDirection:'row',
    marginTop:16,
    
  },

});
