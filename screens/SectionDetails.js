import React, {useState,useEffect} from 'react';
import { StyleSheet, View,Button, FlatList,ActivityIndicator} from 'react-native';
import SectionDetailsComponent from '../component/sectionDetails';
import { firebase } from '../model/config';
import Header from '../component/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
//import TimePicker from the package we installed
import {TimePicker} from 'react-native-simple-time-picker';
import {
  Drawer,
  Text,
  TouchableRipple,

} from 'react-native-paper';

export default function App({route,navigation}) {

  const {productId,key } = route.params;
  const [sectionDetails,setSectionDetails]=useState([]);

 
  const [show, setShow] = useState(false);
  const [timerString,setTimerString]=useState("Select Timer")
 
  const [loading, isLoading] = React.useState(false);
  const [lightValue,setLightValue]=useState(0);


  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);

  const handleChange = (value) => {
    setHours(value.hours);
    setMinutes(value.minutes);
  };

  const updateLightValue = (val) => {
    console.log(val)
    setLightValue(val)

  }

  const pressHandler = () => {
  console.log("Logs Clicked!")
  navigation.push("Logs",{productId,key})
  }


  const  getData  = () => {
    isLoading(true)
    firebase.database().ref("Hardware/"+productId+"/"+key).on('value', function (snapshot) {
    
     var main=[]
     snapshot.forEach((child) => {
      console.log(child.val())
      if(child.val().icon_name!=null){
        main.push({
          "iconName":child.val().icon_name,
          "value":child.val().value,  
          "key":child.val().icon_name,
          "units":child.val().units,
          "name":child.val().name,
          "lower_value":child.val().lower_range,
          "upper_value":child.val().upper_range,
        })
      }else{
        console.log('not a section')
      }  
    });
    setSectionDetails(main)
    console.log(main)
    isLoading(false)
    });
 }

  useEffect(()  => {
   
    getData()
  
  }, []);
  
 
  const setValue = () => {
    console.log("clicked")
    alert(`Value Set!`);
  
    firebase
    .database()
    .ref('Hardware/' + productId+"/"+key+"/light/light_value/")
    .update({
     intensity:lightValue
    })

  }


  const setTime = () => {

    console.log("clicked")
    console.log(hours)
    console.log(minutes)

    if(lightValue<=0){
      alert(`Please set Intensity!`);
    }else{
    if(minutes>0 || minutes>0 ){
    firebase
    .database()
    .ref('Hardware/' + productId+"/"+key+"/light/light_value/")
    .update({
     intensity:lightValue,
     hour:hours,
     minute:minutes
    })
    alert(`Timer Added!`);
    setHours(0)
    setMinutes(0)
  }else{
    alert(`Please Add Time Value`);
  }
}

  }

  const openTimer =() =>{
    console.log("open timer")
    if(show==false){
      setShow(true)
      setTimerString("Close Timer")
    }else{
      setShow(false)
      setTimerString("Select Timer")
    }
    
  }

  const footer = () => {
   
    return(
      
      <View style={styles.bottom}>
  
      <View style={styles.containerAllign}>      
      <Text style={styles.textTwo}>Set Light Intensity</Text>
      </View>
      <Slider
            step={1}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#009387"
            maximumTrackTintColor="#eee"
            value={lightValue
            }
            onSlidingComplete={value =>updateLightValue(value)}
          />
        <View style={styles.bottom_row}>    
        <View  style={styles.containerAllign}>
        <Text style={styles.textValue}>Intensity: {lightValue}</Text>
        </View>  
       
        <TouchableRipple style={styles.containerAllign}
         onPress={()=> {openTimer()}}
        >      
        <Text style={styles.textValue}>{timerString}</Text>
        </TouchableRipple>
        </View>
       

        {show &&
       <TimePicker 
        hoursUnit="Hours"
        minutesUnit="Minutes"
        minutesInterval={5}
        value={{hours, minutes}}
         onChange={handleChange} />
        }
        <View style={styles.bottom_row}>
        <TouchableRipple style={styles.containerAllign}> 
        <Text style={styles.textValue}
        onPress={()=> {setValue()}}
        >Set Value</Text>

         </TouchableRipple>

        
        <TouchableRipple style={styles.containerAllign}> 
        <Text style={styles.textValue}
        onPress={()=> {setTime()}}
        >Set Timer</Text>  
        </TouchableRipple>

        </View>  
      </View>
  
       
      )
  };


  if(loading) {
    return (
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <ActivityIndicator size="large" color="#0000ff"/>
         </View>
    )
   }


  return (
  <SafeAreaView style={styles.container}>
  <Header title={"Section Details"}  pressHandler={pressHandler}  navigation={navigation}/>

   
   <View style={styles.containerAllign}>
      <FlatList
          showsVerticalScrollIndicator={false}
          data={sectionDetails}
          numColumns={2}
          ListFooterComponent={footer}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({ item }) => (
          <SectionDetailsComponent item={item} navigation={navigation} /> )}
          />
   
    </View>

    </SafeAreaView>
   
   
  );
}
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    margin:8
  },
 
  container:{
    flex:1,
    justifyContent:'center',
   
  },
  containerAllign:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    marginTop:16,
  },
  headerList: {
    flex:1,
    marginTop:16,
    justifyContent:'center',
  },
  bottom_row: {
   flexDirection:'row',
   justifyContent:'space-between',
   padding:8,
   marginTop:8,
  },
  bottom:{
  flex:1,
  justifyContent:'center',

  marginTop:32,
  padding:32,
  justifyContent:'space-between',
  borderRadius:16,
  borderColor:'#009387',
  borderWidth:4,
 
  marginBottom:12
  },
  button:{
    flex:1,
    justifyContent:'center',
   
  },
  buttonContainer:{
  
    width:'50%',
    marginTop:16,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:16,
    backgroundColor:'#009387',
    borderRadius:16,
  },
  textValue:{
    fontFamily: 'nunito-bold',
    fontSize:18,
    color:'#ffffff',
    marginTop:8,
    marginBottom:16,
    backgroundColor:'#009387',
    borderRadius:8,
    padding:8,
   
  }, 
  textTwo:{
    fontFamily: 'nunito-bold',
    fontSize:18,
    color:'#000000',
    marginBottom:16
   
  }, 
});


